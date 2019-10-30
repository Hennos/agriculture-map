import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { urls } from '../../../../store/geoCatalog/constants';

const ObjectDescription = ({ id, useViewer }) => {
  const [desctiption, setDescription] = useState(null);

  useEffect(() => {
    fetch(`${urls.catalog}/${id}`)
      .then(response => {
        response.json().then(object => {
          setDescription(object);
        });
      })
      .catch(err => {
        throw err;
      });
  }, []);

  return desctiption == null ? null : <div>{useViewer(desctiption)}</div>;
};

ObjectDescription.propTypes = {
  id: PropTypes.string.isRequired,
  useViewer: PropTypes.func.isRequired
};

export default ObjectDescription;
