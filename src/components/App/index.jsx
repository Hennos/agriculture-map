import React from 'react';

import './index.css';

import Map from '../Map';
import Navigation from '../Navigation';
import Interacting from '../Interacting';

const App = () => (
  <div className="map-application">
    <aside>
      <Navigation stylization="app-navingation modal-window-theme" />
      <Interacting stylization="app-interacting" />
    </aside>
    <main>
      <Map />
    </main>
  </div>
);

export default App;
