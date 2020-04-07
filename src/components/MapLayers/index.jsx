import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import CompositeLayer from '../CompositeLayer';

import { GET_INTERACTING_LAYERS } from './query';

const MapLayers = () => {
  const { data, loading, error } = useQuery(GET_INTERACTING_LAYERS);

  if (loading || error) return null;

  return data.mapLayers.map(({ id }) => <CompositeLayer key={id} id={id} />);
};

MapLayers.propTypes = {
  layers: PropTypes.shape({
    id: PropTypes.number.isRequired
  })
};

export default MapLayers;
