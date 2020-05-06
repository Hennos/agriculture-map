import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import types from './types';

import './index.css';

const VehicleTelemetry = ({ stylization, telemetry }) => {
  const { battery, lastActivity } = telemetry;
  return (
    <ul className={classNames('vehicle-telemetry', stylization)}>
      <li className="telemetry-row">Заряд батареи: {battery}</li>
      <li className="telemetry-row">Последняя активность: {lastActivity}</li>
    </ul>
  );
};

VehicleTelemetry.propTypes = {
  telemetry: PropTypes.shape(types.telemetry).isRequired,
  stylization: PropTypes.string
};

VehicleTelemetry.defaultProps = {
  stylization: ''
};

export default VehicleTelemetry;
