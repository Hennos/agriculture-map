import { keys } from '../../../../store/mapData/constants';
import { setLayers, setEditableLayer } from '../../../../store/mapData/actions';

const getEditableLayer = state => state.mapData[keys.editableLayer];
const getLayers = state => state.mapData[keys.layers];

export const mapStateToProps = state => ({
  layers: getLayers(state),
  editableLayer: getEditableLayer(state)
});

export const mapDispatchToProps = dispatch => ({
  setMapLayers: layers => dispatch(setLayers(layers)),
  chooseEditableLayer: layer => dispatch(setEditableLayer(layer))
});
