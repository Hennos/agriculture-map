import Immutable from 'immutable';

import { keys, events } from './constants';
import initialState from './initialState';

function handleLoadData(prevState, { data }) {
  const preparedData = data.map(({ id, type, coordinates }) => ({
    id,
    type,
    coordinates
  }));
  return prevState.set(keys.status, 'ready').set(keys.data, Immutable.List(preparedData));
}

function handleUpdateAreas(prevState, { areas }) {
  const prevData = prevState.get(keys.data);
  const updatedData = prevData
    .filter(prevArea => areas.find(area => prevArea.id !== area.id))
    .concat(Immutable.List(areas));
  return prevState.set(keys.data, updatedData);
}

function handleRemoveAreas(prevState, { areas }) {
  const prevData = prevState.get(keys.data);
  const updatedData = prevData.filter(prevArea => areas.find(id => prevArea.id !== id));
  return prevState.set(keys.data, updatedData);
}

const handlers = new Map([
  [events.successLoadData, handleLoadData],
  [events.updateAreas, handleUpdateAreas],
  [events.removeAreas, handleRemoveAreas]
]);

export default function(state = initialState, action) {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
}
