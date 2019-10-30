import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import WebSocketContext from '../../../../ws-context';

const WithWebSocketConnection = ({ service, children }) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const socket = io(service);
    setConnection(socket);
  }, []);

  return <WebSocketContext.Provider value={connection}>{children}</WebSocketContext.Provider>;
};

WithWebSocketConnection.propTypes = {
  service: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired
};

export default WithWebSocketConnection;
