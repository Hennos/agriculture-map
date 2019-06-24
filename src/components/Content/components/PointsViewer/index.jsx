import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FeatureGroup } from 'react-leaflet';

import GpsPoint from '../GpsPoint';
import PointsViewerControl from '../PointsViewerControl';

import { mapStateToProps, mapDispatchToProps } from './mapToProps';

import './index.css';

const PointsViewer = ({ target, points }) => {
  const GpsPoints = () =>
    points.map(({ id, local, gps }) => (
      <GpsPoint key={id} localCoordinates={local} gpsCoordinates={gps} />
    ));
  return (
    // onLayeradd={({ layer }) => layer.openPopup()}
    <FeatureGroup>
      {!!points.length && <GpsPoints />}
      {target && (
        <PointsViewerControl
          position="topleft"
          points={points.map(({ id, gps: coordinates }) => ({ id, coordinates }))}
        />
      )}
    </FeatureGroup>
  );
};

const pointType = {
  id: PropTypes.string.isRequired,
  local: PropTypes.arrayOf(PropTypes.number).isRequired,
  gps: PropTypes.arrayOf(PropTypes.number).isRequired
};

PointsViewer.propTypes = {
  target: PropTypes.string,
  points: PropTypes.arrayOf(PropTypes.shape(pointType)).isRequired
};

PointsViewer.defaultProps = {
  target: null
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointsViewer);
