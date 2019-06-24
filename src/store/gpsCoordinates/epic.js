import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { filter, map, mergeMap, catchError } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import { events, LOCAL_CREATED_ID } from './constants';
import {
  setLoadedObject,
  requestProjectPoint,
  successProjectPoint,
  errorProjectPoint,
  requestLoadObject,
  successLoadObject,
  errorLoadObject,
  addProjectedPoint
} from './actions';

const URL_ROOT = 'http://localhost:3001/projection';

const setTargetEpic = action$ =>
  action$.pipe(
    ofType(events.setTarget),
    filter(({ target }) => target !== LOCAL_CREATED_ID && target != null),
    map(({ target }) => requestLoadObject(target))
  );

const addPointEpic = action$ =>
  action$.pipe(
    ofType(events.addPoint),
    map(({ point }) => requestProjectPoint(point))
  );

const requestPointURI = ([y, x]) => `${URL_ROOT}/point/${y}/${x}`;
const requestPointEpic = action$ =>
  action$.pipe(
    ofType(events.requestProjectPoint),
    mergeMap(({ point }) =>
      ajax.getJSON(requestPointURI(point)).pipe(
        map(({ data }) => successProjectPoint(data)),
        catchError(error => of(errorProjectPoint(error)))
      )
    )
  );

const requestObjectURI = object => `${URL_ROOT}/points/${object}`;
const requestObjectEpic = action$ =>
  action$.pipe(
    ofType(events.requestLoadObject),
    mergeMap(({ object }) =>
      ajax.getJSON(requestObjectURI(object)).pipe(
        map(({ data }) => successLoadObject(data)),
        catchError(error => of(errorLoadObject(error)))
      )
    )
  );

const successProjectPointEpic = action$ =>
  action$.pipe(
    ofType(events.successProjectPoint),
    filter(({ data }) => !!data),
    map(({ data }) => addProjectedPoint(data))
  );

const successLoadObjectEpic = action$ =>
  action$.pipe(
    ofType(events.successLoadObject),
    filter(({ data }) => !!data),
    map(({ data }) => setLoadedObject({ points: data }))
  );

const epic = combineEpics(
  setTargetEpic,
  addPointEpic,
  requestPointEpic,
  requestObjectEpic,
  successProjectPointEpic,
  successLoadObjectEpic
);

export default epic;
