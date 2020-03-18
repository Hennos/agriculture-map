import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import CompositeLayer from '../CompositeLayer';

import { GET_MAP_LAYERS } from './query';

const MapLayers = () => {
  const { data } = useQuery(GET_MAP_LAYERS);
  return data ? data.mapLayers.map(({ id }) => <CompositeLayer key={id} id={id} />) : null;
};

MapLayers.propTypes = {
  layers: PropTypes.shape({
    id: PropTypes.number.isRequired
  })
};

export default MapLayers;
