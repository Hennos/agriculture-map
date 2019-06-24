const LOCAL_CREATED_ID = '__created__';

const events = Object.freeze({
  setTarget: '@@GPS_COORDINATES:SET_TARGET',
  addPoint: '@@GPS_COORDINATES:ADD_POINT',

  setLoadedObject: '@@GPS_COORDINATES:SET_LOADED_OBJECT',
  addProjectedPoint: '@@GPS_COORDINATES:ADD_PROJECTED_POINT',

  requestProjectPoint: '@@GPS_COORDINATES:REQUEST_PROJECT_POINT',
  successProjectPoint: '@@GPS_COORDINATES:SUCCESS_PROJECT_POINT',
  errorProjectPoint: '@@GPS_COORDINATES:ERROR_PROJECT_POINT',

  requestLoadObject: '@@GPS_COORDINATES:LOAD_OBJECT',
  successLoadObject: '@@GPS_COORDINATES:SUCCESS_LOAD_OBJECT',
  errorLoadObject: '@@GPS_COORDINATES:ERROR_LOAD_OBJECT'
});

const keys = Object.freeze({
  target: 'target',
  pointsId: 'pointsId',
  points: 'points'
});

export { events, keys, LOCAL_CREATED_ID };
