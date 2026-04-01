import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/igniteui-webcomponents/themes/light/bootstrap.css';
import '../node_modules/igniteui-react-grids/grids/themes/light/bootstrap.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TableVisualization from './custom-visualizations/Table';
import PivotGridVisualization from './custom-visualizations/PivotGrid';

declare global {
  interface Window {
      revealBridge: any;
      revealBridgeListener: any;
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="table" element={<TableVisualization />} />
      <Route path="pivot-grid" element={<PivotGridVisualization />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
