import React from 'react';
import PropTypes from 'prop-types';

import { FeatureGroup } from 'react-leaflet';

import StaticDataLoader from '../StaticDataLoader';
import Objects from '../Objects';
import withLayerServices from '../withLayerServices';

import { getLayerByName } from '../../../../store/mapLayers/requests';

const CompositeLayer = ({ name }) => (
  <StaticDataLoader url={getLayerByName(name)}>
    {({ options = {}, childLayers = [] }) => (
      <FeatureGroup>
        {childLayers.map(childLayer => (
          <CompositeLayer key={childLayer} name={childLayer} />
        ))}
        {/* Для тестов */}
        {withLayerServices([
          {
            name: 'realtime',
            options: {
              request: 'ws_ask_layer_objects',
              response: 'ws_send_layer_objects',
              layerId: name,
              delay: 1000
            }
          }
        ])(props => (
          <Objects layer={name} {...props} />
        ))}
      </FeatureGroup>
    )}
  </StaticDataLoader>
);

CompositeLayer.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default CompositeLayer;
