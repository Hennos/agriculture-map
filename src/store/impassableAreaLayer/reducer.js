import Immutable from 'immutable';

import { keys, events } from './constants';
import initialState from './initialState';

import { createId } from './helpers/createId';

const nextId = createId();

function handleLoadData(prevState, { data }) {
  const preparedData = data.map(({ type, coordinates }) => ({
    id: nextId(),
    type,
    coordinates
  }));
  return prevState.set(keys.status, 'ready').set(keys.data, Immutable.List(preparedData));
}

function handleCreateArea(prevState, { area: { type, coordinates } }) {
  const updatedData = prevState.get(keys.data).push({
    id: nextId(),
    type,
    coordinates
  });
  return prevState.set(keys.data, updatedData);
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
  [events.createArea, handleCreateArea],
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
