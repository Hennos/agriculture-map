import settings from '../../settings';

const urlLayers = settings.urls.layers;

export const getLayerByName = layer => `${urlLayers}/data/${layer}`;
export const getLayerSchemeByName = layer => `${urlLayers}/scheme/${layer}`;
