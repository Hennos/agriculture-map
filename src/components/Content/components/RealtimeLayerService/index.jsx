import React from 'react';
import PropTypes from 'prop-types';

import WebSocketContext from '../../../../ws-context';
import RealtimeDataLoader from '../RealtimeDataLoader';

const RealtimeLayerService = ({ component, options }) => (
  <WebSocketContext.Consumer>
    {socket => (
      <RealtimeDataLoader socket={socket} options={options}>
        {({ objects }) => props => component({ objects, ...props })}
      </RealtimeDataLoader>
    )}
  </WebSocketContext.Consumer>
);

RealtimeLayerService.propTypes = {
  options: PropTypes.shape({}).isRequired,
  component: PropTypes.func.isRequired
};

export default RealtimeLayerService;
