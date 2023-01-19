import React, { useEffect } from 'react';
import './App.css';

declare let $: any;
$.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/")

function App() {

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    let dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
    var rv = new $.ig.RevealView("#revealView");
    rv.dashboard = dashboard;
  }

  return (
    <div id="revealView" style={{ height: "100vh", width: "100%" }}></div>    
  );
}

export default App;
