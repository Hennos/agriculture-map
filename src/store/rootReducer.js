import { combineReducers } from 'redux';

import mapData from './mapData/reducer';
import impassableAreasLayer from './impassableAreaLayer/reducer';

const rootReducer = combineReducers({
  mapData,
  impassableAreasLayer
});

export default rootReducer;
