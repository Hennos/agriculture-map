import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import WithMapServices from '../WithMapServices';
import WebSocketContext from '../../ws-context';

const WithWebSocketConnection = ({ services, children }) => {
  const [connections, setConnections] = useState(null);

  useEffect(() => {
    setConnections(
      Object.fromEntries(
        Object.entries(services.realtime).map(([serviceName, serviceRoot]) => [
          serviceName,
          io(serviceRoot)
        ])
      )
    );
  }, []);

  return (
    connections && (
      <WebSocketContext.Provider value={connections}>{children}</WebSocketContext.Provider>
    )
  );
};

WithWebSocketConnection.propTypes = {
  services: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired
};

export default WithMapServices(WithWebSocketConnection);
