import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const StaticDataLoader = ({ url, children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => {
        response.json().then(loaded => {
          setData(loaded);
        });
      })
      .catch(err => {
        throw err;
      });
  }, []);

  const renderData = useCallback(loaded => children(loaded), [data]);

  return <React.Fragment>{data && renderData(data)}</React.Fragment>;
};

StaticDataLoader.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

export default StaticDataLoader;