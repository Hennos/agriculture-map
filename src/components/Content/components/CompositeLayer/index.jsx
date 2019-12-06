import React from 'react';
import PropTypes from 'prop-types';

import { FeatureGroup } from 'react-leaflet';

import Objects from '../Objects';
import WithLayerServices from '../WithLayerServices';
import WithLayerScheme from '../WithLayerScheme';

const CompositeLayer = ({ name, scheme: { options = {}, childLayers = [] } }) => (
  <FeatureGroup>
    {childLayers.map(childLayer => (
      <CompositeLayer key={childLayer} name={childLayer} />
    ))}
    {WithLayerServices(options.services, props => (
      <Objects layer={name} {...props} />
    ))}
  </FeatureGroup>
);

CompositeLayer.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  scheme: PropTypes.shape({}).isRequired
};

export default WithLayerScheme(CompositeLayer);
