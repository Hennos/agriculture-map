const events = Object.freeze({
  setLayers: '@@MAP_DATA:SET_LAYERS',
  setLayer: '@@MAP_DATA:SET_LAYER',
  setEditableLayer: '@@MAP_DATA:SET_EDITABLE_LAYER'
});

const keys = Object.freeze({
  layers: 'layers',
  editableLayer: 'editableLayer'
});

export { events, keys };
