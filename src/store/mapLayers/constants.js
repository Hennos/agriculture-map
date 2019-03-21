const layers = Object.freeze({
  impassableAreas: 'IMPASSABLE_AREAS',
  paths: 'PATHS'
});

const events = Object.freeze({
  requestImpassableAreasLayer: '@@MAP_LAYERS:REQUEST_IMPASSABLE_AREAS_LAYER',
  requestPathsLayer: '@@MAP_LAYERS:REQUEST_PATHS_LAYER'
});

export { layers, events };
