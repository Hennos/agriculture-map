import { events } from './constants';

export const setTarget = target => ({
  type: events.setTarget,
  target
});
export const addPoint = point => ({
  type: events.addPoint,
  point
});

export const addProjectedPoint = point => ({
  type: events.addProjectedPoint,
  point
});
export const setLoadedObject = object => ({
  type: events.setLoadedObject,
  object
});

export const requestProjectPoint = point => ({
  type: events.requestProjectPoint,
  point
});
export const successProjectPoint = data => ({
  type: events.successProjectPoint,
  data
});
export const errorProjectPoint = error => ({
  type: events.errorProjectPoint,
  error
});

export const requestLoadObject = object => ({
  type: events.requestLoadObject,
  object
});
export const successLoadObject = data => ({
  type: events.successLoadObject,
  data
});
export const errorLoadObject = error => ({
  type: events.errorLoadObject,
  error
});
