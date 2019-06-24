import { keys } from '../../../../store/mapData/constants';
import { keys as gpsKeys } from '../../../../store/gpsCoordinates/constants';
import { setLayers, setEditableLayer } from '../../../../store/mapData/actions';

const getTarget = state => !!state.gpsCoordinates[gpsKeys.target];

const getLayers = state => state.mapData[keys.layers];
const getEditableLayer = state => state.mapData[keys.editableLayer];

export const mapStateToProps = state => ({
  target: getTarget(state),
  layers: getLayers(state),
  editableLayer: getEditableLayer(state)
});

export const mapDispatchToProps = dispatch => ({
  setMapLayers: layers => dispatch(setLayers(layers)),
  chooseEditableLayer: layer => dispatch(setEditableLayer(layer))
});
