import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const DataLoader = ({ request, children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(request)
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

  return data && renderData(data);
};

DataLoader.propTypes = {
  request: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
  children: PropTypes.func.isRequired
};

export default DataLoader;
