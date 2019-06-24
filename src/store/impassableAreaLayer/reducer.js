import { keys, events } from './constants';
import initialState from './initialState';

function handleSetEditing(prevState, { editing }) {
  const prevEditing = prevState[keys.editing];
  if (prevEditing !== editing) {
    const updatedStateChunk = Object.fromEntries([[keys.editing, editing]]);
    return {
      ...prevState,
      ...updatedStateChunk
    };
  }
  return prevState;
}

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

function handleUpdateAreas(prevState, { areas }) {
  const prevData = prevState[keys.data];
  const updatedData = prevData
    .filter(prevArea => !!areas.find(area => prevArea.id !== area.id))
    .concat([...areas]);
  const updatedStateChunk = Object.fromEntries([[keys.data, updatedData]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleRemoveAreas(prevState, { areas }) {
  const prevData = prevState[keys.data];
  const updatedData = prevData.filter(prevArea => !areas.includes(prevArea.id));
  const updatedStateChunk = Object.fromEntries([[keys.data, updatedData]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

const handlers = new Map([
  [events.setEditing, handleSetEditing],
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
