const events = Object.freeze({
  createArea: '@@IMPASSABLE_AREA_LAYER:CREATE_AREA',
  updateAreas: '@@IMPASSABLE_AREA_LAYER:UPDATE_AREAS',
  removeAreas: '@@IMPASSABLE_AREA_LAYER:REMOVE_AREAS',

  setEditing: '@@PLATFORM_TRACKS_LAYER:SET_EDITING',

  requestData: '@@IMPASSABLE_AREA_LAYER:REQUEST_DATA',
  successLoadData: '@@IMPASSABLE_AREA_LAYER:SUCCESS_LOAD_DATA',
  errorLoadData: '@@IMPASSABLE_AREA_LAYER:ERROR_LOAD_DATA',

  successPostData: '@@IMPASSABLE_AREA_LAYER:SUCCESS_POST_DATA',
  errorPostData: '@@IMPASSABLE_AREA_LAYER:ERROR_POST_DATA'
});

const keys = Object.freeze({
  status: 'status',
  editing: 'editing',
  data: 'data'
});

export { events, keys };
