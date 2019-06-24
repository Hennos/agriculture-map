import { combineReducers } from 'redux';

import mapData from './mapData/reducer';
import impassableAreasLayer from './impassableAreaLayer/reducer';
import platformTracksLayer from './platformTracksLayer/reducer';
import gpsCoordinates from './gpsCoordinates/reducer';

const rootReducer = combineReducers({
  mapData,
  impassableAreasLayer,
  platformTracksLayer,
  gpsCoordinates
});

export default rootReducer;
