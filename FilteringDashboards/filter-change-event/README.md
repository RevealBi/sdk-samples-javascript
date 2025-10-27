

# Reveal Filter Change Event Helpers



This sample demonstrates how to detect and respond to filter changes in Reveal dashboards using a modular helper system. The helpers provide a centralized way to monitor filter value changes and execute callbacks when filters are modified.


[![Filter Change Event Demo](https://img.youtube.com/vi/ng2GvRy0ybA/maxresdefault.jpg)](https://youtu.be/ng2GvRy0ybA)



[Watch the demo on YouTube](https://youtu.be/ng2GvRy0ybA)

https://help.revealbi.io/web/filtering-dashboards/

## Features

- **Filter Change Detection**: Automatically detect when dashboard filters are modified- **Filter Change Detection**: Automatically detect when dashboard filters are modified| `reveal-filters/common.js` | Core utilities, `RevealFilters.initReveal`, shared plumbing |

- **Multiple Detection Methods**: Combines DOM events, MutationObserver, and dashboard events for reliable detection

- **Debounced Callbacks**: Configurable debouncing to prevent excessive callback executions- **Multiple Detection Methods**: Combines DOM events, MutationObserver, and dashboard events for reliable detection| `reveal-filters/hiding.js` | Filter hiding + compaction logic |

- **Change Details**: Provides before/after values for each changed filter

- **Pre-apply Filter Values**: Set default filter values before dashboard binding to prevent flicker- **Debounced Callbacks**: Configurable debouncing to prevent excessive callback executions| `reveal-filters/events.js` | Filter change detection and callbacks |

- **Modular Architecture**: Load only the modules you need

- **Change Details**: Provides before/after values for each changed filter
