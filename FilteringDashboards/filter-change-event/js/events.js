(function(window, document){
  'use strict';

  if (!window.RevealFilters || !window.RevealFilters.registerModule){
    console.warn('RevealFilters common module must be loaded before reveal-filters/events.js');
    return;
  }

  var ns = window.RevealFilters;
  var internal = ns._internal || {};
  var moduleId = 'filter-events';
  if (internal.hasModule && internal.hasModule(moduleId)){
    return; // already registered
  }

  var utils = ns.utils || {};
  var chainDashboardFilterHandler = utils.chainDashboardFilterHandler || function(){ return null; };

  function stringifyValue(value){
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'object'){
      try { return JSON.stringify(value); }
      catch (err){ return Object.prototype.toString.call(value); }
    }
    return String(value);
  }

  function cloneValues(value){
    if (value == null) return [];
    var arr = Array.isArray(value) ? value.slice() : [value];
    return arr.map(function(item){
      if (!item || typeof item !== 'object') return item;
      try { return JSON.parse(JSON.stringify(item)); }
      catch (err){ return Object.assign({}, item); }
    });
  }

  function buildSignature(arr){
    return JSON.stringify(arr.map(stringifyValue));
  }

  function enumerateFiltersCollection(collection){
    if (!collection) return [];
    if (Array.isArray(collection)) return collection.slice();
    if (typeof collection.toArray === 'function'){
      try {
        var arr = collection.toArray();
        if (Array.isArray(arr)) return arr.slice();
      } catch (err){}
    }
    if (Array.isArray(collection.items)) return collection.items.slice();
    if (Array.isArray(collection._items)) return collection._items.slice();

    var gathered = [];
    if (typeof collection.forEach === 'function'){
      try {
        collection.forEach(function(item){ gathered.push(item); });
        if (gathered.length) return gathered;
      } catch (err){}
    }

    Object.keys(collection).forEach(function(key){
      var item = collection[key];
      if (item && typeof item === 'object' && 'selectedValues' in item){
        gathered.push(item);
      }
    });

    return gathered;
  }

  function resolveFilterTitle(filter, fallbackIndex){
    if (!filter || typeof filter !== 'object') return 'filter-' + fallbackIndex;
    return filter.title || filter.displayName || filter.name || filter.description || filter.caption || filter.id || ('filter-' + fallbackIndex);
  }


  // get selected filter values
  function createFilterSnapshot(dashboard){
    var snapshot = { map: {}, signatures: {} };
    if (!dashboard || !dashboard.filters) return snapshot;
    var filters = enumerateFiltersCollection(dashboard.filters);
    filters.forEach(function(filter, idx){
      var title = resolveFilterTitle(filter, idx);
      var cloned = cloneValues(filter && filter.selectedValues);
      snapshot.map[title] = cloned;
      snapshot.signatures[title] = buildSignature(cloned);
    });
    return snapshot;
  }

  function diffSnapshots(prev, next){
    var diffs = [];
    var seen = Object.create(null);
    if (prev && prev.map){
      Object.keys(prev.map).forEach(function(key){ seen[key] = true; });
    }
    if (next && next.map){
      Object.keys(next.map).forEach(function(key){ seen[key] = true; });
    }
    Object.keys(seen).forEach(function(key){
      var prevSig = prev && prev.signatures ? prev.signatures[key] : undefined;
      var nextSig = next && next.signatures ? next.signatures[key] : undefined;
      if (prevSig !== nextSig){
        diffs.push({
          title: key,
          previousValues: prev && prev.map && prev.map[key] ? cloneValues(prev.map[key]) : [],
          currentValues: next && next.map && next.map[key] ? cloneValues(next.map[key]) : []
        });
      }
    });
    return diffs;
  }

  function attachFilterChangeWatcher(options){
    var dashboard = options && options.dashboard;
    var root = options && options.root;
    var callback = options && options.callback;
    var onDetected = options && options.onDetected;
    var debounceMs = (options && typeof options.debounceMs === 'number') ? Math.max(options.debounceMs, 0) : 150;
    var hasCallback = typeof callback === 'function';
    var hasDetected = typeof onDetected === 'function';
    if (!dashboard || (!hasCallback && !hasDetected)) return null;

    var snapshot = hasCallback ? createFilterSnapshot(dashboard) : null;
    var timer = null;
    var cleanups = [];

    function emit(origin){
      if (!hasCallback) return;
      var next = createFilterSnapshot(dashboard);
      var changes = diffSnapshots(snapshot, next);
      if (!changes.length) return;
      snapshot = next;
      try {
        callback({
          origin: origin,
          timestamp: Date.now(),
          changes: changes,
          dashboard: dashboard
        });
      } catch (err){
        console.warn('RevealFilters filter change callback error', err);
      }
    }

    function debouncedEmit(origin){
      if (!hasCallback) return;
      if (!debounceMs){
        emit(origin);
        return;
      }
      clearTimeout(timer);
      timer = setTimeout(function(){ emit(origin); }, debounceMs);
    }

    if (root){
      var changeHandler = function(){ debouncedEmit('dom-event'); };
      var detectHandler = function(){ if (hasDetected) onDetected({ origin: 'dom-event', timestamp: Date.now(), dashboard: dashboard }); };
      root.addEventListener('change', changeHandler, true);
      root.addEventListener('input', changeHandler, true);
      if (hasDetected){
        root.addEventListener('change', detectHandler, true);
        root.addEventListener('input', detectHandler, true);
      }
      cleanups.push(function(){
        root.removeEventListener('change', changeHandler, true);
        root.removeEventListener('input', changeHandler, true);
        if (hasDetected){
          root.removeEventListener('change', detectHandler, true);
          root.removeEventListener('input', detectHandler, true);
        }
      });
    }

    if (typeof MutationObserver !== 'undefined' && root){
      var observedTarget = root.querySelector('#globalFiltersPanel') || root;
      try {
        var observer = new MutationObserver(function(mutations){
          if (!mutations || !mutations.length) return;
          if (hasDetected) onDetected({ origin: 'mutation', timestamp: Date.now(), dashboard: dashboard });
          debouncedEmit('mutation');
        });
        observer.observe(observedTarget, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['aria-selected', 'aria-checked', 'aria-expanded', 'class', 'style']
        });
        cleanups.push(function(){ observer.disconnect(); });
      } catch (err){
        console.warn('RevealFilters filter change observer error', err);
      }
    }

    var chained = chainDashboardFilterHandler(dashboard, function(){
      if (hasDetected) onDetected({ origin: 'dashboard', timestamp: Date.now(), dashboard: dashboard });
      debouncedEmit('dashboard');
    });
    if (chained && typeof chained.dispose === 'function'){
      cleanups.push(function(){
        try { chained.dispose(); }
        catch (err){}
      });
    } else if (hasCallback || hasDetected){
      var intervalId = setInterval(function(){
        if (hasDetected) onDetected({ origin: 'poll', timestamp: Date.now(), dashboard: dashboard });
        debouncedEmit('poll');
      }, 700);
      cleanups.push(function(){ clearInterval(intervalId); });
    }

    return {
      dispose: function(){
        clearTimeout(timer);
        cleanups.forEach(function(fn){
          try { fn(); }
          catch (err){}
        });
        cleanups = [];
      }
    };
  }

  var module = {
    id: moduleId,
    extendApi: function(api){
      api.watchFilterChanges = function(dashboard, callback, options){
        if (!dashboard || typeof callback !== 'function') return null;
        var opts = options || {};
        var root = opts.root || (opts.rootSelector ? document.querySelector(opts.rootSelector) : null);
        if (!root){
          var selector = opts.viewSelector || '#revealView';
          root = document.querySelector(selector) || document;
        }
        return attachFilterChangeWatcher({
          dashboard: dashboard,
          root: root,
          callback: callback,
          debounceMs: typeof opts.debounceMs === 'number' ? opts.debounceMs : (typeof opts.debounce === 'number' ? opts.debounce : 150),
          onDetected: typeof opts.onDetected === 'function' ? opts.onDetected : null
        });
      };
    },
    afterBind: function(context){
      var cfg = context && context.config ? context.config : {};
      if (typeof cfg.onFilterChanged !== 'function') return;

      var selector = (context && context.viewSelector) ? context.viewSelector : '#revealView';
      var root = context && context.rootElement ? context.rootElement : null;
      if (!root){
        root = document.querySelector(selector) || document;
      }

      var enableCompactionSync = !!(cfg.compactFilters && typeof ns.scheduleCompaction === 'function');
      var watcher = attachFilterChangeWatcher({
        dashboard: context.dashboard,
        root: root,
        callback: cfg.onFilterChanged,
        debounceMs: typeof cfg.filterChangeDebounce === 'number' ? cfg.filterChangeDebounce : 200,
        onDetected: enableCompactionSync ? function(evt){
          if (evt && evt.origin === 'poll') return;
          try { ns.scheduleCompaction(root); }
          catch (err){ console.warn('RevealFilters scheduleCompaction failed', err); }
        } : null
      });
      if (watcher){
        context.result.filterWatcher = watcher;
        context.addDisposable(function(){ watcher.dispose(); });
      }
    }
  };

  ns.registerModule(moduleId, module);

})(window, document);
