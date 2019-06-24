import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.css';

const PointRecord = ({ stilization, lng, lat }) => (
  <p className={classNames('point-record', stilization)}>{`${lat} / ${lng}`}</p>
);

PointRecord.propTypes = {
  lng: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  stilization: PropTypes.string
};

PointRecord.defaultProps = {
  stilization: ''
};

export default PointRecord;
