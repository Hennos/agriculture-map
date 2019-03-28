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

function handleUpdateTracks(prevState, { tracks }) {
  const prevData = prevState.get(keys.data);
  const updatedData = prevData
    .filter(prevTrack => tracks.find(area => prevTrack.id !== area.id))
    .concat(Immutable.List(tracks));
  return prevState.set(keys.data, updatedData);
}

function handleRemoveTracks(prevState, { tracks }) {
  const prevData = prevState.get(keys.data);
  const updatedData = prevData.filter(prevTrack => tracks.find(id => prevTrack.id !== id));
  return prevState.set(keys.data, updatedData);
}

const handlers = new Map([
  [events.successLoadData, handleLoadData],
  [events.updateTracks, handleUpdateTracks],
  [events.removeTracks, handleRemoveTracks]
]);

export default function(state = initialState, action) {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
}
