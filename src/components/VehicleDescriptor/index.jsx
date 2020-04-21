import React, { useState } from 'react';
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
  const [fullTasks, setFullTasks] = useState(false);
  const { data, loading, error } = useQuery(GET_AERIAL_VEHICLE, { variables: { id } });

  if (loading || error) return null;

  const {
    vehicle: { tasks }
  } = data;
  const taskList = tasks.length <= 1 || fullTasks ? tasks : tasks.slice(0, 1);
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
      <ul className="tasks">
        {tasks.length > 0 && (
          <div className="tasks-controls">
            {tasks.length > 1 && (
              <Button
                name="fullTasks"
                stylization="control-button secondary-control"
                onClick={() => setFullTasks(!fullTasks)}
              >
                {fullTasks ? 'Скрыть задачи' : `Другие задачи (${tasks.length - 1})`}
              </Button>
            )}
            <Button name="addTasks" stylization="control-button main-control" onClick={() => {}}>
              Новая задача
            </Button>
          </div>
        )}
        {taskList.map(({ taskId, taskName, steps }) => (
          <li key={taskId} className="task">
            <p className="task-header">
              <span>{taskName}</span>
              <Button name="cancel" stylization="control-button">
                <i className="fas fa-times" />
              </Button>
            </p>
            {steps.map(({ stepId, stopTime, stepPos }) => (
              <p className="task-step" key={stepId}>
                <span>
                  {stepPos.lng} / {stepPos.lat}
                </span>
                {stopTime && <span>{stopTime}</span>}
              </p>
            ))}
          </li>
        ))}
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