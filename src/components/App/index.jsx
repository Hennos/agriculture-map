import React from 'react';

import './index.css';

import Map from '../Map';
import Navigation from '../Navigation';
import Interacting from '../Interacting';

const App = () => (
  <div className="map-application">
    <Navigation stylization="app-navingation modal-window-theme" />
    <aside>
      <Interacting stylization="app-interacting modal-window-theme" />
    </aside>
    <main>
      <Map />
    </main>
  </div>
);

export default App;
