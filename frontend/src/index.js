import './i18n';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'round-flag-icons/css/round-flag-icons.css';
import './styles/styles.scss';
import App from './App';


const rootElement = document.getElementById('app');
const root = createRoot(rootElement);
root.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);