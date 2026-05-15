import React, { useEffect } from 'react';
import { RevealSdkSettings, RVDashboard, RevealView } from 'reveal-sdk';
import './App.css';

RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");

const customVisualizations = [
  {
    title: "HTML Table",
    path: "/table",
    icon: "https://help.revealbi.io/img/logo.png"
  },
  {
    title: "Ignite UI Pivot Grid",
    path: "/pivot-grid",
    icon: "https://help.revealbi.io/img/logo.png"
  }
];

function App() {

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    let dashboard = await RVDashboard.loadDashboard("Sales");
    var rv = new RevealView("#revealView");
    rv.dashboard = dashboard;

    // Add custom visualizations to the chart types drop down.
    customVisualizations.forEach((visualization) => {
      rv.chartTypes.push({
        title: visualization.title,
        url: new URL(visualization.path, window.location.origin).toString(),
        icon: visualization.icon,
        groups: ["Custom Visualizations"]
      });
    });
  }

  return (
    <div id="revealView" style={{ height: "100vh", width: "100%" }}></div>
  );
}

export default App;
