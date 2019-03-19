const events = Object.freeze({
  requestData: '@@IMPASSABLE_AREA_LAYER:REQUEST_DATA',
  successLoadData: '@@IMPASSABLE_AREA_LAYER:SUCCESS_LOAD_DATA',
  errorLoadData: '@@IMPASSABLE_AREA_LAYER:ERROR_LOAD_DATA',

  createArea: '@@IMPASSABLE_AREA_LAYER:CREATE_AREA',
  updateAreas: '@@IMPASSABLE_AREA_LAYER:UPDATE_AREAS',
  removeAreas: '@@IMPASSABLE_AREA_LAYER:REMOVE_AREAS'
});

const keys = Object.freeze({
  status: 'status',
  data: 'data'
});

export { events, keys };
