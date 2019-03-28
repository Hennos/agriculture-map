const events = Object.freeze({
  createTrack: '@@PLATFORM_TRACKS_LAYER:CREATE_TRACK',
  updateTracks: '@@PLATFORM_TRACKS_LAYER:UPDATE_TRACKS',
  removeTracks: '@@PLATFORM_TRACKS_LAYER:REMOVE_TRACKS',

  requestData: '@@PLATFORM_TRACKS_LAYER:REQUEST_DATA',
  successLoadData: '@@PLATFORM_TRACKS_LAYER:SUCCESS_LOAD_DATA',
  errorLoadData: '@@PLATFORM_TRACKS_LAYER:ERROR_LOAD_DATA',

  successPostData: '@@PLATFORM_TRACKS_LAYER:SUCCESS_POST_DATA',
  errorPostData: '@@PLATFORM_TRACKS_LAYER:ERROR_POST_DATA'
});

const keys = Object.freeze({
  status: 'status',
  data: 'data'
});

export { events, keys };
