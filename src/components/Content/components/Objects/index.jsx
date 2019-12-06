import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { GeoJSON } from 'react-leaflet';
import hash from 'hash-sum';

import types from './types';

const Objects = ({ collection }) => (
  <GeoJSON
    key={hash(collection)}
    pointToLayer={(feature, latlng) =>
      L.circleMarker(latlng, {
        color: 'red',
        key: 0,
        radius: 5,
        fillColor: 'blue',
        fillOpacity: 1.0
      })
    }
    data={collection}
  />
);

Objects.propTypes = {
  layer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  collection: PropTypes.arrayOf(PropTypes.shape(types.objectData))
};

Objects.defaultProps = {
  collection: []
};

export default Objects;
