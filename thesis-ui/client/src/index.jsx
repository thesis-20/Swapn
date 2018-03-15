import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// import Sling from './components/Sling/index.jsx';
// import Auth from './components/Auth/Signup.jsx';
import App from './App.jsx';

import './index.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>
  ,document.getElementById('app'),
);