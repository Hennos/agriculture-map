import React from 'react';
import ReactDOM from 'react-dom';

import StateProvider from './graphql-client';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';

ReactDOM.render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById('application')
);

registerServiceWorker();
