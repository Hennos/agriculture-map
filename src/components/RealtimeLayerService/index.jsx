import React from 'react';
import PropTypes from 'prop-types';

import WebSocketContext from '../../ws-context';
import RealtimeDataLoader from '../RealtimeDataLoader';

import propTypes from './types';

const RealtimeLayerService = ({ layerScheme, options, children }) => {
  const {
    objects: { endpoint, types: regTypes }
  } = layerScheme;
  return (
    <WebSocketContext.Consumer>
      {channels => (
        <RealtimeDataLoader
          socket={channels.layersGeodata}
          options={{
            layer: endpoint,
            request: 'ws_ask_layer_objects',
            response: 'ws_send_layer_objects',
            repeat: true,
            delay: options.delay
          }}
        >
          {({ objects }) =>
            children({
              collection: objects,
              types: regTypes
            })
          }
        </RealtimeDataLoader>
      )}
    </WebSocketContext.Consumer>
  );
};

RealtimeLayerService.propTypes = {
  layerScheme: PropTypes.shape(propTypes.layerScheme).isRequired,
  options: PropTypes.shape(propTypes.options).isRequired,
  children: PropTypes.func.isRequired
};

export default RealtimeLayerService;
