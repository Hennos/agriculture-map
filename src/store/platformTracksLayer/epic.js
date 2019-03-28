import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, map, flatMap, catchError } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import { events } from './constants';
import {
  requestData,
  successLoadData,
  errorLoadData,
  successPostData,
  errorPostData
} from './actions';
import { layers, events as mapLayersEvents } from '../mapLayers/constants';
import { setLayer } from '../mapData/actions';

const URL_ROOT = 'http://localhost:3001/layers';

const requestLoadLayerDataEpic = action$ =>
  action$.pipe(
    ofType(mapLayersEvents.requestPlatformTracksLayer),
    map(() => requestData())
  );

const requestDataURI = `${URL_ROOT}?name=platformTracks`;
const requestDataEpic = action$ =>
  action$.pipe(
    ofType(events.requestData),
    mergeMap(() =>
      ajax.getJSON(requestDataURI).pipe(
        map(({ data }) => successLoadData(data)),
        catchError(error => of(errorLoadData(error)))
      )
    )
  );

const getLayerDataEpic = action$ =>
  action$.pipe(
    ofType(events.successLoadData),
    map(() => setLayer(layers.platformTracks))
  );

const postCreateObjectURI = `${URL_ROOT}?name=platformTracks&action=create`;
const createBodyCreateObject = ({ type, coordinates }) =>
  JSON.stringify({
    data: {
      type,
      coordinates
    }
  });
const postCreateObjectEpic = action$ =>
  action$.pipe(
    ofType(events.createTrack),
    mergeMap(({ track: created }) =>
      ajax({
        url: postCreateObjectURI,
        method: 'POST',
        body: createBodyCreateObject(created),
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        flatMap(() => [requestData(), successPostData()]),
        catchError(error => of(errorPostData(error)))
      )
    )
  );

const postUpdateObjectsURI = `${URL_ROOT}?name=platformTracks&action=update`;
const createBodyUpdateObjects = objects =>
  JSON.stringify({
    data: objects.map(({ id, type, coordinates }) => ({
      id,
      type,
      coordinates
    }))
  });
const postUpdateObjectsEpic = action$ =>
  action$.pipe(
    ofType(events.updateTracks),
    mergeMap(({ tracks: updated }) =>
      ajax({
        url: postUpdateObjectsURI,
        method: 'POST',
        crossDomain: true,
        body: createBodyUpdateObjects(updated),
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(() => successPostData()),
        catchError(error => of(errorPostData(error)))
      )
    )
  );

const postRemoveObjectsURI = `${URL_ROOT}?name=platformTracks&action=remove`;
const createBodyRemoveObjects = objects =>
  JSON.stringify({
    data: objects
  });
const postRemoveObjectsEpic = action$ =>
  action$.pipe(
    ofType(events.removeTracks),
    mergeMap(({ tracks: removed }) =>
      ajax({
        url: postRemoveObjectsURI,
        method: 'POST',
        crossDomain: true,
        body: createBodyRemoveObjects(removed),
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(() => successPostData()),
        catchError(error => of(errorPostData(error)))
      )
    )
  );

const epic = combineEpics(
  requestLoadLayerDataEpic,
  requestDataEpic,
  getLayerDataEpic,
  postCreateObjectEpic,
  postUpdateObjectsEpic,
  postRemoveObjectsEpic
);

export default epic;
