import React from 'react';
import PropTypes from 'prop-types';

import WebSocketContext from '../../../../ws-context';
import RealtimeDataLoader from '../RealtimeDataLoader';

const StaticLayerService = ({ layer, options, children }) => (
  <WebSocketContext.Consumer>
    {channels => (
      <RealtimeDataLoader
        socket={channels.geodata}
        options={{
          layer,
          request: 'ws_ask_layer_objects',
          response: 'ws_send_layer_objects'
        }}
      >
        {({ objects }) => children({ collection: objects })}
      </RealtimeDataLoader>
    )}
  </WebSocketContext.Consumer>
);

StaticLayerService.propTypes = {
  layer: PropTypes.string.isRequired,
  options: PropTypes.shape({}).isRequired,
  children: PropTypes.func.isRequired
};

export default StaticLayerService;
