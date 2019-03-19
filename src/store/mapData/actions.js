import { events } from "./constants";

export const setLayers = layers => ({
  type: events.setLayers,
  layers
});

export const setLayer = layer => ({
  type: events.setLayer,
  layer
});
