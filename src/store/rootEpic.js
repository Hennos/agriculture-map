import { combineEpics } from 'redux-observable';

import mapLayers from './mapLayers/epic';
import impassableAreasLayer from './impassableAreaLayer/epic';

const rootEpic = combineEpics(mapLayers, impassableAreasLayer);

export default rootEpic;
