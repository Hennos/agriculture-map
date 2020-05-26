import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { GET_OBJECTS_DATA } from './query';

import types from './types';

const StaticLayerService = ({ layerScheme, children }) => {
  const { id, objectTypes } = layerScheme;
  const { loading, error, data } = useQuery(GET_OBJECTS_DATA, { variables: { id } });

  if (loading || error) return null;

  const { objectsGeodata } = data.mapLayer;

  return children({ collection: objectsGeodata, types: objectTypes });
};

StaticLayerService.propTypes = {
  layerScheme: PropTypes.shape(types.layerScheme).isRequired,
  children: PropTypes.func.isRequired
};

export default StaticLayerService;
