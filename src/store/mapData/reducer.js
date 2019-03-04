import { keys, events } from "./constants";
import initialState from "./initialState";

function handleSetBoundGeometry(prevState, { geometry }) {
  return prevState.set(keys.boundsGeometry, geometry);
}

const handlers = new Map([[events.setBoundsGeometry, handleSetBoundGeometry]]);

export default function(state = initialState, action) {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === "function") {
    return handleAction(state, action);
  }

  return state;
}
