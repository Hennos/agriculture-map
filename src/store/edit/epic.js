import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import { events } from './constants';
import { successPostData, errorPostData } from './actions';

const URL_EDIT_API = 'http://localhost:3001/layers';

const postCreateObjectURI = `${URL_EDIT_API}?name=impassableAreas&action=create`;
const createBodyCreateObject = ({ type, coordinates }) =>
  JSON.stringify({
    data: {
      type,
      coordinates
    }
  });
const postCreateObjectEpic = action$ =>
  action$.pipe(
    ofType(events.createObject),
    mergeMap(({ object: created }) =>
      ajax({
        url: postCreateObjectURI,
        method: 'POST',
        body: createBodyCreateObject(created)
      }).pipe(
        map(response => successPostData(response)),
        catchError(error => of(errorPostData(error)))
      )
    )
  );

const postUpdateObjectsURI = `${URL_EDIT_API}?name=impassableAreas&action=update`;
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
    ofType(events.changeObjects),
    mergeMap(({ objects: changed }) =>
      ajax({
        url: postUpdateObjectsURI,
        method: 'POST',
        crossDomain: true,
        body: createBodyUpdateObjects(changed)
      }).pipe(
        map(() => successPostData()),
        catchError(error => of(errorPostData(error)))
      )
    )
  );

const postRemoveObjectsURI = `${URL_EDIT_API}?name=impassableAreas&action=remove`;
const createBodyRemoveObjects = objects =>
  JSON.stringify({
    data: objects
  });
const postRemoveObjectsEpic = action$ =>
  action$.pipe(
    ofType(events.removeObjects),
    mergeMap(({ objects: removed }) =>
      ajax({
        url: postRemoveObjectsURI,
        method: 'POST',
        crossDomain: true,
        body: createBodyRemoveObjects(removed)
      }).pipe(
        map(() => successPostData()),
        catchError(error => of(errorPostData(error)))
      )
    )
  );

const epic = combineEpics(postCreateObjectEpic, postUpdateObjectsEpic, postRemoveObjectsEpic);

export default epic;
