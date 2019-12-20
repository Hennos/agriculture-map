import React from 'react';
import PropTypes from 'prop-types';

import { FeatureGroup } from 'react-leaflet';

import Objects from '../Objects';
import WithLayerServices from '../WithLayerServices';
import WithLayerScheme from '../WithLayerScheme';

const CompositeLayer = WithLayerScheme(({ scheme }) => {
  const { options, childLayers, services, ...layerScheme } = scheme;
  return (
    <FeatureGroup>
      {childLayers.map(childLayer => (
        <CompositeLayer key={childLayer} name={childLayer} />
      ))}
      {WithLayerServices(services, layerScheme, props => (
        <Objects {...props} />
      ))}
    </FeatureGroup>
  );
});

CompositeLayer.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default CompositeLayer;
