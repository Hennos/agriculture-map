import React from 'react';
import PropTypes from 'prop-types';

import WebSocketContext from '../../../../ws-context';
import RealtimeDataLoader from '../RealtimeDataLoader';

import types from './types';

const RealtimeLayerService = ({ options, children }) => (
  <WebSocketContext.Consumer>
    {channels => (
      <RealtimeDataLoader
        socket={channels.geodata}
        options={{
          request: 'ws_ask_layer_objects',
          response: 'ws_send_layer_objects',
          layer: options.layer,
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
  options: PropTypes.shape(types.options).isRequired,
  children: PropTypes.func.isRequired
};

export default RealtimeLayerService;
