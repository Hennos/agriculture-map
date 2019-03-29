import { events } from './constants';

export const setLayers = layers => ({
  type: events.setLayers,
  layers
});

export const setLayer = layer => ({
  type: events.setLayer,
  layer
});

export const setEditableLayer = layer => ({
  type: events.setEditableLayer,
  layer
});
