# Reveal SDK - View Underlying Visualization Data

This project demonstrates how to use the powerful capabilities of the Reveal SDK & the Reveal SDK DOM to enable rich, interactive data experiences.  You can embed and customize dashboard visualizations, including tooltips, data fetching, and interactive filters using these libraries.

## Features

- **Dynamic Dashboard Loading**: Load dashboards dynamically from the Reveal server by specifying a dashboard name and server endpoint.
- **Interactive Tooltips**: Customize tooltips to include additional actions, such as fetching underlying data or displaying custom information.
- **Data Interaction**: Fetch underlying data for specific cells or entire visualizations through API integration.
- **Event Handling**: Implement event handlers for tooltips to enable custom interactions.

## Getting Started

### Prerequisites

- **Reveal Server**: Ensure you have a running Reveal Server instance. Update the `baseUrl` in the script to match your Reveal Server's endpoint.
- **Dashboard**: A dashboard (`Marketing` in this example) must exist on your Reveal Server.

### Installation

1. Clone this repository.
2. Include the necessary libraries in your project:
   - [jQuery](https://jquery.com/)
   - [Day.js](https://day.js.org/)
   - [Reveal SDK](https://revealbi.io/)

### Usage

1. Set the `baseUrl` to point to your Reveal Server.
2. Specify the dashboard name (`dashboardName`) to load.
3. Open the `index.html` file in your browser.

```html
const baseUrl = "http://localhost:5111/";
const dashboardName = "Marketing";
```

4. The dashboard will load into the `<div>` with the `id="revealView"`.

### Custom Tooltip Implementation

- **Tooltip Event Handler**: The `onTooltipShowing` event lets you customize tooltip actions.
- **Custom Menu Items**: Add custom options like "Show Underlying Data" to tooltips.
- **Data Fetching**: Use the `fetchData` function to query the Reveal Server API and open a popup with the fetched data.

```javascript
revealView.onTooltipShowing = (args) => {
    handleTooltipShowing(args, baseUrl, dashboardName);
};
```

### Key Functions

- **`handleTooltipShowing`**: Adds custom menu items to the tooltip and handles interactions.
- **`fetchData`**: Fetches underlying data for the tooltip selection or all fields in a visualization.
- **`logTooltipDetails`**: Logs tooltip arguments for debugging.
- **`safeStringify`**: Safely serializes objects to prevent errors caused by circular references.

### Error Handling

- Ensures that any failures during dashboard loading or data fetching are logged and displayed to the user with meaningful error messages.

## References

- [Reveal SDK Documentation](https://help.revealbi.io/api/javascript/latest/index.html)
- [Reveal BI Product Page](https://www.revealbi.io/)

## License

This project is licensed under the [MIT License](LICENSE).