import React, { useEffect } from 'react';
import './App.css';

declare let $: any;
$.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/")

function App() {

  useEffect(() => {
    var revealView = new $.ig.RevealView("#revealView");
  }, [])

  return (
    <div id="revealView" style={{height: "100vh", width: "100%"}}></div>
  );
}

export default App;
