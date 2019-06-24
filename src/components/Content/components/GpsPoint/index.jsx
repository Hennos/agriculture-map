import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

import PointRecord from '../PointRecord';

import './index.css';

const GpsPoint = ({ localCoordinates, gpsCoordinates }) => (
  <Marker position={localCoordinates} icon={L.divIcon({ className: 'gps-point' })}>
    <Popup closeButton={false} autoClose={false}>
      <PointRecord lng={gpsCoordinates[0]} lat={gpsCoordinates[1]} />
    </Popup>
  </Marker>
);

GpsPoint.propTypes = {
  localCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  gpsCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default GpsPoint;
