import { keys, events } from './constants';
import initialState from './initialState';

function handleSetLayer(prevState, { layer }) {
  const prevLayers = prevState.get(keys.layers);
  const updateLayers = prevLayers.filter(prevLayer => prevLayer !== layer).push(layer);
  return prevState.set(keys.layers, updateLayers);
}

const handlers = new Map([[events.setLayer, handleSetLayer]]);

export default function(state = initialState, action) {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
}
