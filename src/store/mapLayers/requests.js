import { urls } from '../../app.settings';

const urlLayers = urls.layers;

export const getLayerConfigByName = layer => `${urlLayers}/configuration?name=${layer}`;

export const getLayerByName = layer => `${urlLayers}/data?name=${layer}`;
export const getLayersByName = layers => {
  const layerNames = layers.map(layer => `names[]=${layer}`).join('&');
  return `${urlLayers}/data?${layerNames}`;
};

export const getLayerSchemeByName = layer => `${urlLayers}/scheme?name=${layer}`;
export const getLayersSchemeByName = layers => {
  const layerNames = layers.map(layer => `names[]=${layer}`).join('&');
  return `${urlLayers}/scheme?${layerNames}`;
};

// http://localhost:3001/layers/data?names[]=TestLayer2&names[]=TestLayer1
