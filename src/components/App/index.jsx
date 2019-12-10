import React from 'react';

import './index.css';

import Map from '../Map';

const App = () => (
  <div className="map-application">
    <div className="map-application-content map-application-fragment">
      <div className="content-container">
        <Map />
      </div>
    </div>
  </div>
);

export default App;
