import React from 'react';
import PropTypes from 'prop-types';

import { FeatureGroup } from 'react-leaflet';

import Objects from '../Objects';
import WithLayerServices from '../WithLayerServices';
import WithLayerScheme from '../WithLayerScheme';

import types from './types';

const CompositeLayer = WithLayerScheme(({ name, scheme }) => {
  const { options, childLayers, services, objects } = scheme;
  return (
    <FeatureGroup>
      {childLayers.map(childLayer => (
        <CompositeLayer key={childLayer} name={childLayer} />
      ))}
      {WithLayerServices(name, services, props => (
        <Objects {...props} />
      ))}
    </FeatureGroup>
  );
});

CompositeLayer.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default CompositeLayer;
