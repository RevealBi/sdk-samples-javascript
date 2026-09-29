import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import 'igniteui-react-grids/grids/themes/light/bootstrap.css';
import './index.css';
import App from './App';
import TableVisualization from './custom-visualizations/Table';
import PivotGridVisualization from './custom-visualizations/PivotGrid';

declare global {
  interface Window {
      revealBridge: any;
      revealBridgeListener: any;
  }
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="table" element={<TableVisualization />} />
      <Route path="pivot-grid" element={<PivotGridVisualization />} />
    </Routes>
  </BrowserRouter>
);
