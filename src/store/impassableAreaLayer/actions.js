import { events } from './constants';

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