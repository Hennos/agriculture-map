import React from 'react';
import ReactDOM from 'react-dom';

import settings from './settings';

import StateProvider from './graphql-client';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';

ReactDOM.render(
  <StateProvider apiURL={settings.services.graphql}>
    <App />
  </StateProvider>,
  document.getElementById('interactiveMapRoot')
);

registerServiceWorker();
