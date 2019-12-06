import React from 'react';
import PropTypes from 'prop-types';

import WebSocketContext from '../../../../ws-context';
import RealtimeDataLoader from '../RealtimeDataLoader';

import types from './types';

const RealtimeLayerService = ({ layer, options, children }) => (
  <WebSocketContext.Consumer>
    {channels => (
      <RealtimeDataLoader
        socket={channels.geodata}
        options={{
          layer,
          request: 'ws_ask_layer_objects',
          response: 'ws_send_layer_objects',
          repeat: true,
          delay: options.delay
        }}
      >
        {({ objects }) => children({ collection: objects })}
      </RealtimeDataLoader>
    )}
  </WebSocketContext.Consumer>
);

RealtimeLayerService.propTypes = {
  layer: PropTypes.string.isRequired,
  options: PropTypes.shape(types.options).isRequired,
  children: PropTypes.func.isRequired
};

export default RealtimeLayerService;
