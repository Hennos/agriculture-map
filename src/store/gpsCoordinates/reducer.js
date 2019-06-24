import { keys, events } from './constants';
import initialState from './initialState';

function handleSetTarget(prevState, { target }) {
  const updatedStateChunk = Object.fromEntries([[keys.target, target]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleAddProjectedPoint(prevState, { point: [localPoint, gpsPoint] }) {
  const prevPoints = prevState[keys.points];
  const prevPointsId = prevState[keys.pointsId];

  const addedPoint = {
    local: localPoint,
    gps: gpsPoint
  };
  const updatedPoints = { ...prevPoints };
  updatedPoints[prevPointsId.length] = addedPoint;
  const updatedPointsId = Object.keys(updatedPoints);

  const updatedStateChunk = Object.fromEntries([
    [keys.pointsId, updatedPointsId],
    [keys.points, updatedPoints]
  ]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleSetLoadedObject(prevState, { object: { points } }) {
  const parsedPoints = Object.fromEntries(
    points.map(([localPoint, gpsPoint], id) => [
      id,
      {
        local: localPoint,
        gps: gpsPoint
      }
    ])
  );
  const parsedPointsId = Object.keys(parsedPoints);
  const updatedStateChunk = Object.fromEntries([
    [keys.pointsId, parsedPointsId],
    [keys.points, parsedPoints]
  ]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

const handlers = new Map([
  [events.setTarget, handleSetTarget],
  [events.addProjectedPoint, handleAddProjectedPoint],
  [events.setLoadedObject, handleSetLoadedObject]
]);

export default function(state = initialState, action) {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
}
