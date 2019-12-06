import React from 'react';
import PropTypes from 'prop-types';

import WebSocketContext from '../../../../ws-context';
import RealtimeDataLoader from '../RealtimeDataLoader';

const StaticLayerService = ({ options, children }) => (
  <WebSocketContext.Consumer>
    {channels => (
      <RealtimeDataLoader
        socket={channels.geodata}
        options={{
          request: 'ws_ask_layer_objects',
          response: 'ws_send_layer_objects',
          layer: options.layer
        }}
      >
        {({ objects }) => children({ collection: objects })}
      </RealtimeDataLoader>
    )}
  </WebSocketContext.Consumer>
);

StaticLayerService.propTypes = {
  options: PropTypes.shape({}).isRequired,
  children: PropTypes.func.isRequired
};

export default StaticLayerService;
