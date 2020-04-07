import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { FeatureGroup } from 'react-leaflet';

import Objects from '../Objects';
import WithLayerServices from '../WithLayerServices';

import { GET_MAP_LAYER_SCHEME } from './query';

const CompositeLayer = ({ id }) => {
  const { loading, error, data } = useQuery(GET_MAP_LAYER_SCHEME, {
    variables: { id }
  });

  if (loading || error) return null;

  const { disabled, child, services, ...layerScheme } = data.scheme;
  return (
    !disabled && (
      <FeatureGroup>
        {child.map(({ id: childLayer }) => (
          <CompositeLayer key={childLayer} id={childLayer} />
        ))}
        {WithLayerServices(services, layerScheme, props => (
          <Objects {...props} />
        ))}
      </FeatureGroup>
    )
  );
};

CompositeLayer.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default CompositeLayer;
