# Reveal Filters Helpers (Modular)

These helpers centralize common UX customizations for the Reveal JavaScript SDK filter bar:

| File | Purpose |
| --- | --- |
| `reveal-filters/common.js` | Core utilities, `RevealFilters.initReveal`, shared plumbing |
| `reveal-filters/hiding.js` | Filter hiding + compaction logic |
| `reveal-filters/events.js` | Filter change detection and callbacks |

Include only the files you need. The examples below load all three to provide the complete experience (hide + compaction + change events).

- Hide filters / compact only: load `common.js` + `hiding.js`.
- Listen for filter changes only: load `common.js` + `events.js`.

- Pre-apply one or more filter values before the view binds (prevents flicker/re-render).
- Hide specific filters by title without modifying the dashboard.
- Compact the filter bar so visible filters “slide left” to fill gaps left by hidden filters and keep it compact after changes.

It’s designed to be drop-in for pages like `filter-japan.html`, with a small configuration object and no changes to your dashboard definitions.

## Quick start

Include the helper after the Reveal script and initialize it with a config object:

```html
<script src="https://dl.revealbi.io/reveal/libs/1.8.0/infragistics.reveal.js"></script>
<script src="./reveal-filters/common.js"></script>
<script src="./reveal-filters/hiding.js"></script>
<script src="./reveal-filters/events.js"></script>
<script>
  RevealFilters.initReveal({
    baseUrl: "http://localhost:5082/",   // Reveal server; optional
    dashboardName: "Manufacturing",       // Dashboard to load
    defaultFilter: {                       // Optional: pre-apply values before bind
      title: "Line",
      values: ["Line 3"]
    },
    hideFilters: ["Product", "Operators by Function"], // Titles to hide
    compactFilters: true,                 // Shift visible filters left to fill gaps
    viewSelector: "#revealView"          // Container for RevealView
  }).then(({ dashboard, view }) => {
    console.log("Reveal ready", { dashboard, view });
  });
</script>
```

## How it works

The helper deliberately sequences operations to avoid flicker, perform DOM-based hiding, and compact the layout:

1. Pre-hide and fade-in

- Injects a short CSS rule to set the view container’s opacity to 0 and then fade in (`transition: opacity 150ms`).
- Builds and injects filter-specific prehide rules that hide the chosen filter “cells” by targeting: `div#cell:has([id*="VizFilter_{Title}"])`, plus attribute/text fallbacks.
- This prevents the target filters from flashing during the initial render.

1. Load dashboard and pre-apply defaults

- Loads the dashboard via `$.ig.RVDashboard.loadDashboard(dashboardName)`.
- If `defaultFilter` is provided, it sets `selectedValues` on the matching dashboard filter BEFORE binding the dashboard to the view. This removes the extra render round-trip that causes blinking.

1. Bind the view

- Creates `new $.ig.RevealView(viewSelector)` and assigns `view.dashboard = dashboard`.
- Runs two small delayed JS passes to hide filter cells (as a safety net in case CSS missed an element due to layout timing).
- Finally, fades in the view by setting `opacity: 1` on the view container using `requestAnimationFrame`.

1. Compact remaining filters (optional)

- If `compactFilters: true`, runs `compactFilterRows` to re-position visible filter chips from left to right (absolute layout) and adjusts the trailing `#spacer` width.
- Schedules compaction at several points to keep it “sticky”:
  - Immediately after initial bind.
  - On window resize.
  - On `dashboard.onFiltersChanged` (filter value changes).
  - Via a `MutationObserver` attached to the filter bar container to catch Reveal’s internal reflows/renders (debounced, with a guard to avoid feedback loops).

## File structure overview

The helper is a self-invoking module that exposes a small API on `window.RevealFilters`:

- `initReveal(config)`
  - Orchestrates everything. Accepts:
    - `baseUrl?: string` — optional Reveal server base URL.
    - `dashboardName: string` — dashboard to load.
    - `defaultFilter?: { title: string, values: string[] | string }` — pre-apply values before binding.
    - `hideFilters?: string[]` — list of filter titles to hide.
    - `compactFilters?: boolean` — enable compaction behavior.
    - `viewSelector?: string` — CSS selector for the view’s host element, defaults to `#revealView`.
  - Returns a Promise resolving to `{ dashboard, view }`.

- `applyFilterValues(dashboard, title, values)`
  - Looks up a dashboard filter by its title and sets `selectedValues` to the provided array (or scalar). Returns `true` if applied.

- `hideFilterCells(filterTitles)`
  - Public wrapper that hides cells by title using the same DOM logic used during init.

- `injectPrehideFor(filterTitles)`
  - Appends more prehide CSS rules on demand.

- `compact()`
  - Runs the compaction procedure manually.

- `observeCompaction()`
  - Attaches the `MutationObserver` used for sticky compaction and returns the observer (or `null` if unsupported).

## Key internals

- `injectStyle(id, css)`
  - Creates or updates a `<style>` tag by `id` and injects CSS text content.

- `normalizeForIdMatch(title)`
  - Normalizes a filter title to match Reveal’s internal id pattern `VizFilter_{Title}` by replacing whitespace with underscores.

- `buildPrehideCSS(viewSelector, filterTitles)`
  - Produces CSS selectors that hide any `div#cell` that contains a child matching the filter title by several heuristics:
    - ID contains `VizFilter_{NormalizedTitle}`.
    - Attribute contains the raw title (`id`, `aria-label`, or `data-filter`).
  - Returns a single CSS string that sets `display: none; visibility: hidden; height: 0; overflow: hidden` on matching cells.

- `hideFilterCells(root, filterTitles)`
  - JS fallback when CSS misses elements (e.g., timing/race). Walks child nodes under `root`, finds anything that looks related to a target filter title by attributes or text, and hides the nearest ancestor `div#cell` by setting inline styles (`display`, `visibility`, `height`, `overflow`). Returns the count of cells hidden.

- `applyFilterValues(dashboard, title, values)`
  - Fetches the filter by `dashboard.filters.getByTitle(title)` and assigns `selectedValues`. It accepts a single string or an array; errors are caught and logged.

- `compactFilterRows(root)`
  - Gathers all `div#cell` elements, groups by parent, filters out hidden cells, and lays out visible cells sequentially from `left = 5px`, using each cell’s width and a fixed spacing. Updates `#spacer` width/left to fill remaining horizontal space. Sets an internal `_isCompacting` flag to avoid triggering the observer during its own DOM writes.

- `attachFilterBarObserver(root)`
  - Locates the filter bar container (prefers `#globalFiltersPanel`, else the parent of the first cell). Sets up a `MutationObserver` that watches `childList` and `style` attribute changes, debounces for 100ms, and invokes `compactFilterRows` unless `_isCompacting` is true.

## Assumptions and compatibility

- Reveal SDK DOM:
  - Relies on the common structure where the filter bar contains repeated `div#cell` nodes and (optionally) a trailing `#spacer` element.
  - Titles and internal IDs follow the `VizFilter_{Title}` convention. If your dashboard uses different conventions or localized titles, adjust your `hideFilters` titles accordingly.

- Positioning:
  - This compaction works with absolute-positioned filter cells (what Reveal renders in the filter bar). If Reveal changes its DOM or layout strategy in a future version, selectors or the compaction may need updates.

- Browser support:
  - `MutationObserver` is widely supported. If it’s unavailable, compaction still runs on init, window resize, and `onFiltersChanged`, but may not re-apply after every micro-change.

## Limitations

- UI only: Hiding and compaction alter DOM/layout only; dashboard filter logic remains unchanged.
- Title matching: `hideFilters` operates by title heuristics. If two filters share similar titles, both may match. Use distinct titles where possible.
- Re-layout timing: Compaction and hiding run in a few delayed passes to catch late layout; very heavy dashboards may need timing tweaks.

## Troubleshooting

- Filter flashes then hides
  - Ensure the helper is loaded before you create the `RevealView` and that `initReveal` runs before the view binds.
- Default selection isn’t applied
  - Verify the `title` matches exactly the filter title in the dashboard and the `values` are valid for that filter.
- Compaction doesn’t stick
  - Keep `compactFilters: true`. The observer should re-compact on render changes; if not, call `RevealFilters.compact()` after your custom UI actions.

## Examples

See `filter-japan.html` for a working page demonstrating:

- Pre-applying a filter value (Line => Line 3).
- Hiding selected filters (Product, Operators by Function).
- Compacting the filter bar and keeping it compact after changes.
