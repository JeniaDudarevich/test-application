import React from 'react';
import ReactDOM from 'react-dom';
import "./config/bootstrap";
import App from './containers/App';
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import stores from "./stores";

ReactDOM.render(
  <BrowserRouter>
    <Provider {...stores}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));
