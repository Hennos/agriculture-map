import React from 'react';
import PropTypes from 'prop-types';

import { Polyline } from 'react-leaflet';

import types from './types';

const Objects = ({ layer, objects }) =>
  objects.map(({ geometry }) => <Polyline key={0} positions={geometry.coordinates} />);

Objects.propTypes = {
  layer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  objects: PropTypes.arrayOf(PropTypes.shape(types.objectData))
};

Objects.defaultProps = {
  objects: []
};

export default Objects;
