import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import { events } from './constants';
import { successLoadData, errorLoadData } from './actions';
import { layers, events as mapLayersEvents } from '../mapLayers/constants';
import { setLayer } from '../mapData/actions';

const requestLayerDataURI = 'http://localhost:3001/layers?name=impassableAreas';
const requestDataEpic = action$ =>
  action$.pipe(
    ofType(mapLayersEvents.requestImpassableAreasLayer),
    mergeMap(() =>
      ajax.getJSON(requestLayerDataURI).pipe(
        map(({ data }) => successLoadData(data)),
        catchError(error => of(errorLoadData(error)))
      )
    )
  );

const getLayerDataEpic = action$ =>
  action$.pipe(
    ofType(events.successLoadData),
    map(() => setLayer(layers.impassableAreas))
  );

const epic = combineEpics(requestDataEpic, getLayerDataEpic);

export default epic;
