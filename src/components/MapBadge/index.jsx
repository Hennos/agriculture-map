import React from 'react';
import PropTypes from 'prop-types';
import Control from 'react-leaflet-control';

import './index.css';

const MapBadge = ({ position, title }) => (
  <Control position={position}>
    <div className="map-badge">
      <p>{title}</p>
    </div>
  </Control>
);

MapBadge.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.string
};

MapBadge.defaultProps = {
  position: 'topright'
};

export default MapBadge;
