import { combineEpics } from 'redux-observable';

import mapLayers from './mapLayers/epic';
import impassableAreasLayer from './impassableAreaLayer/epic';
import platformTracksLayer from './platformTracksLayer/epic';
import gpsCoordinates from './gpsCoordinates/epic';

const rootEpic = combineEpics(mapLayers, impassableAreasLayer, platformTracksLayer, gpsCoordinates);

export default rootEpic;
