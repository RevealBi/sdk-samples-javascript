(function(window, document){
  'use strict';

  var ns = window.RevealFilters = window.RevealFilters || {};
  var internal = ns._internal;
  if (!internal){
    internal = {
      modules: [],
      moduleMap: Object.create(null),
      registerModule: function(id, module){
        if (!id || !module) return null;
        if (this.moduleMap[id]) return this.moduleMap[id];
        module.id = id;
        this.moduleMap[id] = module;
        this.modules.push(module);
        if (typeof module.extendApi === 'function'){
          try { module.extendApi(ns); }
          catch (err){ console.warn('RevealFilters module "' + id + '" extendApi failed', err); }
        }
        return module;
      },
      hasModule: function(id){
        return !!(id && this.moduleMap[id]);
      },
      runHook: function(name, context){
        this.modules.forEach(function(module){
          var fn = module && module[name];
          if (typeof fn === 'function'){
            try { fn(context); }
            catch (err){
              var modId = module.id || 'unknown';
              console.warn('RevealFilters module "' + modId + '" failed during hook ' + name, err);
            }
          }
        });
      }
    };
    internal.modular = true;
    ns._internal = internal;
  }

  function injectStyle(id, css){
    var el = document.getElementById(id);
    if (!el){
      el = document.createElement('style');
      el.id = id;
      document.head.appendChild(el);
    }
    if (typeof css === 'string'){
      el.textContent = css;
    }
    return el;
  }

  function normalizeForIdMatch(title){
    if (!title) return '';
    return String(title).replace(/\s+/g, '_');
  }

  function chainDashboardFilterHandler(dashboard, handler){
    if (!dashboard || typeof handler !== 'function') return null;
    var evt = dashboard.onFiltersChanged;

    if (typeof evt === 'function'){
      var previous = evt;
      dashboard.onFiltersChanged = function(sender, args){
        if (typeof previous === 'function'){
          try { previous(sender, args); }
          catch (err){ console.warn('RevealFilters previous onFiltersChanged error', err); }
        }
        try { handler(sender, args); }
        catch (err){ console.warn('RevealFilters onFiltersChanged handler error', err); }
      };
      return {
        dispose: function(){
          dashboard.onFiltersChanged = previous;
        }
      };
    }

    if (evt && typeof evt.addListener === 'function'){
      try { evt.addListener(handler); }
      catch (err){ console.warn('RevealFilters addListener failed', err); return null; }
      return {
        dispose: function(){
          try {
            if (typeof evt.removeListener === 'function') evt.removeListener(handler);
            else if (typeof evt.remove === 'function') evt.remove(handler);
            else if (typeof evt.unsubscribe === 'function') evt.unsubscribe(handler);
          } catch (err2){ console.warn('RevealFilters removeListener failed', err2); }
        }
      };
    }

    if (evt && typeof evt.add === 'function'){
      try { evt.add(handler); }
      catch (err){ console.warn('RevealFilters add failed', err); return null; }
      return {
        dispose: function(){
          try {
            if (typeof evt.remove === 'function') evt.remove(handler);
            else if (typeof evt.delete === 'function') evt.delete(handler);
          } catch (err2){ console.warn('RevealFilters remove failed', err2); }
        }
      };
    }

    if (evt && typeof evt.subscribe === 'function'){
      var subscription = null;
      try { subscription = evt.subscribe(handler); }
      catch (err){
        console.warn('RevealFilters subscribe failed', err);
        try { evt.subscribe(handler); } catch (err2){}
      }
      return {
        dispose: function(){
          try {
            if (subscription && typeof subscription.unsubscribe === 'function') subscription.unsubscribe();
            else if (typeof evt.unsubscribe === 'function') evt.unsubscribe(handler);
          } catch (err2){ console.warn('RevealFilters unsubscribe failed', err2); }
        }
      };
    }

    return null;
  }

  function findFilterContainer(root){
    if (!root) return null;
    var container = root.querySelector('#globalFiltersPanel');
    if (!container){
      var firstCell = root.querySelector('div#cell');
      container = firstCell ? firstCell.parentElement : null;
    }
    return container;
  }

  ns.utils = Object.assign({}, ns.utils || {}, {
    injectStyle: injectStyle,
    normalizeForIdMatch: normalizeForIdMatch,
    chainDashboardFilterHandler: chainDashboardFilterHandler,
    findFilterContainer: findFilterContainer
  });

  ns.registerModule = function(id, module){
    return internal.registerModule(id, module);
  };

  function applyFilterValues(dashboard, title, values){
    if (!dashboard || !title || values == null) return false;
    try {
      var filter = dashboard.filters && typeof dashboard.filters.getByTitle === 'function'
        ? dashboard.filters.getByTitle(title)
        : null;
      if (!filter) return false;
      var arr = Array.isArray(values) ? values : [values];
      filter.selectedValues = arr;
      return true;
    } catch (err){
      console.warn('RevealFilters.applyFilterValues error for', title, err);
      return false;
    }
  }

  ns.applyFilterValues = applyFilterValues;

  function initReveal(config){
    var cfg = config || {};
    var baseUrl = cfg.baseUrl;
    var dashboardName = cfg.dashboardName || 'Sales';
    var viewSelector = cfg.viewSelector || '#revealView';

    if (baseUrl) {
      $.ig.RevealSdkSettings.setBaseUrl(baseUrl);
    }

    var context = {
      config: cfg,
      utils: ns.utils,
      viewSelector: viewSelector,
      rootSelector: viewSelector,
      state: {},
      disposables: [],
      result: {},
      addDisposable: function(fn){
        if (typeof fn === 'function'){ this.disposables.push(fn); }
      }
    };

    var fadeCss = viewSelector + '{opacity:0;transition:opacity 150ms ease;}';
    ns.utils.injectStyle('rf-base-fade', fadeCss);

    internal.runHook('beforeLoad', context);

    return $.ig.RVDashboard.loadDashboard(dashboardName).then(function(dashboard){
      context.dashboard = dashboard;
      internal.runHook('afterDashboardLoaded', context);

      var defaultFilter = cfg.defaultFilter;
      if (defaultFilter && defaultFilter.title && defaultFilter.values){
        applyFilterValues(dashboard, defaultFilter.title, defaultFilter.values);
      }

      internal.runHook('beforeViewCreate', context);
      var view = new $.ig.RevealView(viewSelector);
      context.view = view;

      internal.runHook('beforeBind', context);
      view.dashboard = dashboard;
      context.rootElement = document.querySelector(viewSelector) || document;
      internal.runHook('afterBind', context);
      internal.runHook('afterInit', context);

      requestAnimationFrame(function(){
        var el = document.querySelector(viewSelector);
        if (el) el.style.opacity = '1';
      });

      var result = { dashboard: dashboard, view: view };
      Object.keys(context.result).forEach(function(key){
        result[key] = context.result[key];
      });

      if (context.disposables.length){
        result.dispose = function(){
          context.disposables.forEach(function(fn){
            try { fn(); } catch (err){}
          });
          context.disposables.length = 0;
        };
      }

      return result;
    });
  }

  ns.initReveal = initReveal;

})(window, document);
