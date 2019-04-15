import { keys, events } from './constants';
import initialState from './initialState';

function handleLoadData(prevState, { data }) {
  const preparedData = data.map(({ id, type, coordinates }) => ({
    id,
    type,
    coordinates
  }));
  const updatedStateChunk = Object.fromEntries([[keys.status, 'ready'], [keys.data, preparedData]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleUpdateTracks(prevState, { tracks }) {
  const prevData = prevState[keys.data];
  const updatedData = prevData
    .filter(prevTrack => tracks.find(track => prevTrack.id !== track.id))
    .concat([...tracks]);
  const updatedStateChunk = Object.fromEntries([[keys.data, updatedData]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleRemoveTracks(prevState, { tracks }) {
  const prevData = prevState.get(keys.data);
  const updatedData = prevData.filter(prevTrack => tracks.find(track => prevTrack.id !== track.id));
  const updatedStateChunk = Object.fromEntries([[keys.data, updatedData]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
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
