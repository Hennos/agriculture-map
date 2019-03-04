const loadStatusEnum = Object.freeze({
  none: 'NONE',
  loading: 'LOADING',
  success: 'SUCCESS',
  error: 'ERROR',
});

const events = Object.freeze({
  requestLoadAppData: '@@LOADER:REQUEST_LOAD_APP_DATA',

  loadLegend: '@@LOADER:LOAD_LEGEND',
  successLoadLegend: '@@LOADER:SUCCESS_LOAD_LEGEND',
  errorLoadLegend: '@@LOADER:ERROR_LOAD_LEGEND',

  loadUserStatus: '@@LOADER:LOAD_USER_STATUS',
  successLoadUserStatus: '@@LOADER:SUCCESS_LOAD_USER_STATUS',
  errorLoadUserStatus: '@@LOADER:ERROR_LOAD_USER_STATUS',

  loadAreaPropertries: '@@LOADER:LOAD_AREA_PROPERTIES',
  successLoadAreaPropertries: '@@LOADER:SUCCESS_LOAD_AREA_PROPERTIES',
  errorLoadAreaPropertries: '@@LOADER:ERROR_LOAD_AREA_PROPERTIES',

  loadFilters: '@@LOADER:LOAD_FILTERS',
  successLoadFilters: '@@LOADER:SUCCESS_LOAD_FILTERS',
  errorLoadFilters: '@@LOADER:ERROR_LOAD_FILTERS',
});

const keys = Object.freeze({
  legendLoadStatus: 'legendLoadStatus',
  errorMsgLoadLegend: 'errorMsgLoadLegend',
  userStatusLoadStatus: 'userStatusLoadStatus',
  errorMsgLoadUserStatus: 'errorMsgLoadUserStatus',
  areaPropertiesLoadStatus: 'areaPropertiesLoadStatus',
  errorMsgAreaProperties: 'errorMsgAreaProperties',
  filtersLoadStatus: 'filtersLoadStatus',
  errorMsgFilters: 'errorMsgFilters',
});

export { loadStatusEnum, events, keys };
