import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useQuery } from '@apollo/react-hooks';

import Button from '../Button';

import { GET_AERIAL_VEHICLE } from './query';

import './index.css';

const controls = [
  {
    name: 'show',
    icon: 'far fa-eye',
    handler: () => {}
  },
  {
    name: 'openMenu',
    icon: 'fas fa-ellipsis-h',
    handler: () => {}
  }
];

const VehicleDescriptor = ({ id, stylization }) => {
  const { data, loading, error } = useQuery(GET_AERIAL_VEHICLE, { variables: { id } });

  if (loading || error) return null;

  const {
    vehicle: { tasks }
  } = data;
  return (
    <div className={classNames('vehicle-descriptor', stylization)}>
      <p className="vehicle-title">
        <span>{id}</span>
        {controls.map(({ name, icon, handler }) => (
          <Button key={name} name={name} stylization="control-button" onClick={handler}>
            <i className={icon} />
          </Button>
        ))}
      </p>
      <ul className="tasks-list">
        {tasks.map(({ taskId, taskName, steps }) => (
          <li key={taskId} className="task">
            <p className="task-header">
              <span>{taskName}</span>
              <Button name="cancel" stylization="control-button">
                <i className="fas fa-times" />
              </Button>
            </p>
            {steps.map(({ stepId, stopTime, stepPos }) => (
              <p className="task-step" key={stepId}>
                <span className="task-step-coordinates">
                  {stepPos.lng} / {stepPos.lat}
                </span>
                {stopTime && <span className="task-step-stop-time">{stopTime}</span>}
              </p>
            ))}
          </li>
        ))}
        <div className="" />
      </ul>
    </div>
  );
};

VehicleDescriptor.propTypes = {
  id: PropTypes.string.isRequired,
  stylization: PropTypes.string
};

VehicleDescriptor.defaultProps = {
  stylization: ''
};

export default VehicleDescriptor;
