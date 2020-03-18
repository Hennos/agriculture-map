import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import types from './types';

const RealtimeDataLoader = ({ socket, options, children }) => {
  const [data, setData] = useState(null);

  const { request, response, layer, repeat = false, delay = 100 } = options;
  useEffect(() => {
    let loader = setTimeout(function run() {
      socket.emit(request, layer);
      if (repeat) {
        loader = setTimeout(run, delay);
      }
    }, 0);

    socket.on(response, ({ id, ...loaded }) => {
      if (id === options.layer) {
        setData(loaded);
      }
    });

    return function cleanup() {
      clearTimeout(loader);
    };
  }, []);

  const renderData = useCallback(loaded => children(loaded), [data]);

  return <>{data && renderData(data)}</>;
};

RealtimeDataLoader.propTypes = {
  socket: PropTypes.shape(types.socket).isRequired,
  options: PropTypes.shape(types.options),
  children: PropTypes.func.isRequired
};

RealtimeDataLoader.defaultProps = {
  options: {
    repeat: false
  }
};

export default RealtimeDataLoader;
