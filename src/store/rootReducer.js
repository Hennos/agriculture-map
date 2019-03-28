import { combineReducers } from 'redux';

import mapData from './mapData/reducer';
import impassableAreasLayer from './impassableAreaLayer/reducer';
import platformTracksLayer from './platformTracksLayer/reducer';

const rootReducer = combineReducers({
  mapData,
  impassableAreasLayer,
  platformTracksLayer
});

export default rootReducer;
