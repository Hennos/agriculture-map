import React from 'react';
import PropTypes from 'prop-types';

import WebSocketContext from '../../ws-context';
import RealtimeDataLoader from '../RealtimeDataLoader';

import propTypes from './types';

const RealtimeLayerService = ({ layerScheme, options, children }) => {
  const { objects } = layerScheme;

  const { endpoint } = objects;
  const schemeOptions = objects.types
    ? {
        types: objects.types
      }
    : {
        format: objects.format
      };

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
          {data =>
            children({
              collection: data.objects,
              ...schemeOptions
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
