import React from 'react';
import PropTypes from 'prop-types';
import Control from 'react-leaflet-control';

import PointRecord from '../PointRecord';

import './index.css';

const PointsViewerControl = ({ position, points }) => (
  <Control position={position}>
    <div className="point-viewer-control">
      <p className="title">Координаты объекта</p>
      <div className="points">
        {!!points.length &&
          points.map(({ id, coordinates }) => (
            <PointRecord
              key={id}
              stilization="point-control"
              lng={coordinates[0]}
              lat={coordinates[1]}
            />
          ))}
      </div>
    </div>
  </Control>
);

const pointType = {
  id: PropTypes.string.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
};

PointsViewerControl.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape(pointType)),
  position: PropTypes.string
};

PointsViewerControl.defaultProps = {
  points: [],
  position: 'topleft'
};

export default PointsViewerControl;
