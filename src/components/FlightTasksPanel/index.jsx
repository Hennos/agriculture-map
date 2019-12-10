import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Control from 'react-leaflet-control';

import './index.css';

const FlightTasksPanel = ({ position }) => {
  const [hidden, setHidden] = useState(false);

  const collapseButton = (
    <button
      type="button"
      className={classNames('collapse-button', !hidden && 'collapse-button-hidden')}
      onClick={() => setHidden(!hidden)}
    >
      <i className="fa fa-caret-up" />
    </button>
  );

  return (
    <Control position={position}>
      <div className="flight-tasks-panel">
        <p className="title">Полётные задания</p>
        {collapseButton}
        {hidden && <div className="content" />}
      </div>
    </Control>
  );
};

FlightTasksPanel.propTypes = {
  position: PropTypes.string
};

FlightTasksPanel.defaultProps = {
  position: 'topleft'
};

export default FlightTasksPanel;
