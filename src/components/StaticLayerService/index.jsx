import React from 'react';
import PropTypes from 'prop-types';

import WebSocketContext from '../../ws-context';
import RealtimeDataLoader from '../RealtimeDataLoader';

import types from './types';

const StaticLayerService = ({ layerScheme, children }) => {
  const {
    objects: { endpoint }
  } = layerScheme;
  return (
    <WebSocketContext.Consumer>
      {channels => (
        <RealtimeDataLoader
          socket={channels.layersGeodata}
          options={{
            layer: endpoint,
            request: 'ws_ask_layer_objects',
            response: 'ws_send_layer_objects'
          }}
        >
          {({ objects }) => children({ collection: objects })}
        </RealtimeDataLoader>
      )}
    </WebSocketContext.Consumer>
  );
};

StaticLayerService.propTypes = {
  layerScheme: PropTypes.shape(types.layerScheme).isRequired,
  children: PropTypes.func.isRequired
};

export default StaticLayerService;
