import { keys, events } from './constants';
import initialState from './initialState';

function handleSetLayer(prevState, { layer }) {
  const prevLayers = prevState.get(keys.layers);
  const updatedLayers = prevLayers.filter(prevLayer => prevLayer !== layer).push(layer);
  return prevState.set(keys.layers, updatedLayers);
}

function handleSetEditableLayer(prevState, { layer }) {
  const prevLayers = prevState.get(keys.layers);
  if (!prevLayers.includes(layer)) {
    return prevState;
  }
  return prevState.set(keys.editableLayer, layer);
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
