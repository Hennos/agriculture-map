import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const RealtimeDataLoader = ({ socket, options, children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loading = setInterval(() => {
      socket.emit(options.request, options.layerId);
    }, options.delay);

    socket.on(options.response, loaded => {
      setData(loaded);
    });

    return function cleanup() {
      clearInterval(loading);
    };
  }, []);

  const renderData = useCallback(loaded => children(loaded), [data]);

  return <React.Fragment>{data && renderData(data)}</React.Fragment>;
};

RealtimeDataLoader.propTypes = {
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired
  }).isRequired,
  options: PropTypes.shape({
    delay: PropTypes.number
  }),
  children: PropTypes.func.isRequired
};

RealtimeDataLoader.defaultProps = {
  options: {
    delay: 100
  }
};

export default RealtimeDataLoader;
