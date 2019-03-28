import createPresenter from '../createPresenter';
import { layers as types } from '../../../../store/mapLayers/constants';

import ImpassableAreas from '../ImpassableAreas';
import PlatformTracks from '../PlatformTracks';

const layers = {};
layers[types.impassableAreas] = ImpassableAreas;
layers[types.platformTracks] = PlatformTracks;

const MapLayersPresenter = createPresenter(layers);

export default MapLayersPresenter;
