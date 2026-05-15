import React, { useEffect } from 'react';
import { RevealSdkSettings, RevealView } from 'reveal-sdk';
import './App.css';

RevealSdkSettings.setBaseUrl("http://localhost:5111/");

function App() {

  useEffect(() => {
    new RevealView("#revealView");
  }, []);

  return (
    <div id="revealView" style={{ height: "100vh", width: "100%" }}></div>
  );
}

export default App;
