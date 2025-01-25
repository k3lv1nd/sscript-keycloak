import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import keycloak from './keycloak';
import { HashRouter as Router } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import 'bootstrap/dist/css/bootstrap.css';
import {introspectUser, loadUser} from "./actions/auth";

const root = ReactDOM.createRoot(document.getElementById('root'));
const eventLogger = (event, error) => {
  if(event === 'onAuthSuccess') {
      const userDetails = {
        username: keycloak.tokenParsed?.preferred_username,
        email: keycloak.tokenParsed?.email,
      };
      introspectUser(userDetails)
  }
};

root.render(
  <ReactKeycloakProvider authClient={keycloak} onEvent={eventLogger}
  initOptions={{
    onLoad: 'check-sso',
    responseMode: 'query',
    checkLoginIframe: false
  }}>
    <Router>
      <App />
    </Router>
  </ReactKeycloakProvider>
);
reportWebVitals();
