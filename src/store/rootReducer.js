import { combineReducers } from "redux";

import loader from "./loader/reducer";
import mapData from "./mapData/reducer";

const rootReducer = combineReducers({
  loader,
  mapData
});

export default rootReducer;
