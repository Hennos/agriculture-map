import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { GeoJSON } from 'react-leaflet';
import hash from 'hash-sum';

const Objects = ({ collection, types }) => (
  <GeoJSON
    key={hash(collection)}
    filter={({ properties }) => {
      const result = types.map(regType => regType.id).includes(properties.type);
      return result;
    }}
    style={({ properties }) => {
      const featureType = types.find(({ id: typeId }) => properties.type === typeId);
      return {
        ...featureType.format
      };
    }}
    pointToLayer={({ properties }, latlng) => {
      const pointType = types.find(({ id: typeId }) => properties.type === typeId);
      const pointFormat = {
        color: 'red',
        radius: 5,
        fillColor: 'blue',
        fillOpacity: 1.0,
        ...pointType.format
      };
      return L.circleMarker(latlng, pointFormat);
    }}
    data={collection}
  />
);

Objects.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.shape({})),
  types: PropTypes.arrayOf(PropTypes.shape({}))
};

Objects.defaultProps = {
  collection: [],
  types: []
};

export default Objects;
