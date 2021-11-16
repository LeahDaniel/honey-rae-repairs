import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Repairs } from "./components/Repairs";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Repairs />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
