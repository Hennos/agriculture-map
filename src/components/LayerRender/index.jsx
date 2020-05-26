import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { FeatureGroup } from 'react-leaflet';

import Objects from '../Objects';
import WithLayerServices from '../WithLayerServices';

import { GET_MAP_LAYER_SCHEME } from './query';

const LayerRender = ({ id }) => {
  const { loading, error, data } = useQuery(GET_MAP_LAYER_SCHEME, {
    variables: { id }
  });

  if (loading || error) return null;

  const { services, ...layerScheme } = data.scheme;
  return WithLayerServices(services, layerScheme, props => <Objects {...props} />);
};

LayerRender.propTypes = {
  id: PropTypes.string.isRequired
};

export default LayerRender;
