import { events } from './constants';

export const createArea = area => ({
  type: events.createArea,
  area
});
export const updateAreas = areas => ({
  type: events.updateAreas,
  areas
});
export const removeAreas = areas => ({
  type: events.removeAreas,
  areas
});

export const setEditing = editing => ({
  type: events.setEditing,
  editing
});

export const requestData = () => ({
  type: events.requestData
});
export const successLoadData = data => ({
  type: events.successLoadData,
  data
});
export const errorLoadData = error => ({
  type: events.errorLoadData,
  error
});

export const successPostData = () => ({
  type: events.successPostData
});
export const errorPostData = error => ({
  type: events.errorPostData,
  error
});
