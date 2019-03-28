const layers = Object.freeze({
  impassableAreas: 'IMPASSABLE_AREAS',
  platformTracks: 'PLATFORM_TRACKS'
});

const events = Object.freeze({
  requestImpassableAreasLayer: '@@MAP_LAYERS:REQUEST_IMPASSABLE_AREAS_LAYER',
  requestPlatformTracksLayer: '@@MAP_LAYERS:REQUEST_PLATFORM_TRACKS_LAYER'
});

export { layers, events };
