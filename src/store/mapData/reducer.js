import { keys, events } from './constants';
import initialState from './initialState';

function handleSetLayer(prevState, { layer }) {
  const prevLayers = prevState[keys.layers];
  const updatedLayers = prevLayers.filter(prevLayer => prevLayer !== layer).concat(layer);
  const updatedStateChunk = Object.fromEntries([[keys.layers, updatedLayers]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleSetEditableLayer(prevState, { layer }) {
  const prevLayers = prevState[keys.layers];
  if (!prevLayers.includes(layer)) {
    return prevState;
  }
  const updatedStateChunk = Object.fromEntries([[keys.editableLayer, layer]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

const handlers = new Map([
  [events.setLayer, handleSetLayer],
  [events.setEditableLayer, handleSetEditableLayer]
]);

export default function(state = initialState, action) {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
}
