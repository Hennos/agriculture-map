import { events } from './constants';

export const createObject = object => ({
  type: events.createObject,
  object
});
export const changeObjects = objects => ({
  type: events.changeObjects,
  objects
});
export const removeObjects = objects => ({
  type: events.removeObjects,
  objects
});

export const successPostData = () => ({
  type: events.successPostData
});
export const errorPostData = error => ({
  type: events.errorPostData,
  error
});
