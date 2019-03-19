import createPresenter from '../createPresenter';
import { layers as types } from '../../../../store/mapLayers/constants';

import ImpassableAreas from '../ImpassableAreas';

const layers = {};
layers[types.impassableAreas] = ImpassableAreas;

const MapLayersPresenter = createPresenter(layers);

export default MapLayersPresenter;
