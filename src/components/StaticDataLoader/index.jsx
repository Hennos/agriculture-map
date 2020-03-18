import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const StaticDataLoader = ({ url, children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (response.status !== 404) {
          response.json().then(loaded => {
            setData(loaded);
          });
        } else {
          setData(null);
        }
      })
      .catch(err => {
        throw err;
      });
  }, []);

  const renderData = useCallback(loaded => children(loaded), [data]);

  return <>{data && renderData(data)}</>;
};

StaticDataLoader.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

export default StaticDataLoader;
