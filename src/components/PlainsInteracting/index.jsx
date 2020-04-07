import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.css';

const PlainsInteracting = ({ stylization }) => (
  <div className={classNames('plains-interacting', stylization)} />
);

PlainsInteracting.propTypes = {
  stylization: PropTypes.string
};

PlainsInteracting.defaultProps = {
  stylization: ''
};

export default PlainsInteracting;
