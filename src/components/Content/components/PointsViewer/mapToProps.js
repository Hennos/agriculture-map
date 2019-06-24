import { createSelector } from 'reselect';

import { keys } from '../../../../store/gpsCoordinates/constants';

const getTarget = state => state.gpsCoordinates[keys.target];

const getPointId = state => state.gpsCoordinates[keys.pointsId];
const getPoints = state => state.gpsCoordinates[keys.points];
const getPretendPoints = createSelector(
  getPointId,
  getPoints,
  (pointsId, points) => pointsId.map(id => ({ id, ...points[id] }))
);

export const mapStateToProps = state => ({
  target: getTarget(state),
  points: getPretendPoints(state)
});

export const mapDispatchToProps = () => ({});
