import { combineEpics } from 'redux-observable';

import mapLayers from './mapLayers/epic';
import impassableAreasLayer from './impassableAreaLayer/epic';
import platformTracksLayer from './platformTracksLayer/epic';

const rootEpic = combineEpics(mapLayers, impassableAreasLayer, platformTracksLayer);

export default rootEpic;
