import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { GET_MAP_LAYER_OBJECTS } from './query';

import types from './types';

const StaticLayerService = ({ layerScheme, children }) => {
  const { dataSource, objects: objectTypes } = layerScheme;
  const { loading, error, data } = useQuery(GET_MAP_LAYER_OBJECTS, { variables: { dataSource } });

  if (loading || error) return children;

  const { objects } = data.mapLayer;

  return children({ collection: objects, objectTypes });
};

StaticLayerService.propTypes = {
  layerScheme: PropTypes.shape(types.layerScheme).isRequired,
  children: PropTypes.func.isRequired
};

export default StaticLayerService;
