import React, { useEffect } from 'react';
import './App.css';

declare let $: any;
//$.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/")
$.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/")

function App() {

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    let dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
    var rv = new $.ig.RevealView("#revealView");
    rv.dashboard = dashboard;

    //add custom vizualization to chart types drop down
    rv.chartTypes.push({
      title: "HTML Table",
      url: "http://localhost:3000/table", //provide the url to your custom vizualization
      icon: "https://help.revealbi.io/img/logo.png",
      groups: ["Custom Vizualizations"]
    });
  }

  return (
    <div id="revealView" style={{ height: "100vh", width: "100%" }}></div>    
  );
}

export default App;
