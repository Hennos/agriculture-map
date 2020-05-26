import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import EditingContext from '../LayerEditing/Context';

const EditPolicy = ({ layer, policy }) => {
  const setPolicy = useContext(EditingContext);

  useEffect(() => {
    setPolicy(layer, policy);
  }, [layer, policy, setPolicy]);

  return null;
};

EditPolicy.propTypes = {
  policy: PropTypes.shape({})
};

EditPolicy.defaultProps = {
  policy: {}
};

export default EditPolicy;
