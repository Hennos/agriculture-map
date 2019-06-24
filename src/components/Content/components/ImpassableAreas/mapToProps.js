import { createSelector } from 'reselect';

import { keys as layerKeys } from '../../../../store/impassableAreaLayer/constants';
import {
  setEditing,
  createArea,
  updateAreas,
  removeAreas
} from '../../../../store/impassableAreaLayer/actions';
import { LOCAL_CREATED_ID } from '../../../../store/gpsCoordinates/constants';
import { setTarget, addPoint } from '../../../../store/gpsCoordinates/actions';

const getEditing = state => state.platformTracksLayer[layerKeys.editing];
const getNormalizedAreas = createSelector(
  state => state.impassableAreasLayer[layerKeys.data],
  areas =>
    areas.map(({ id, coordinates }) => ({
      id,
      coordinates
    }))
);

export const mapStateToProps = state => ({
  editing: getEditing(state),
  areas: getNormalizedAreas(state)
});

export const mapDispatchToProps = dispatch => ({
  pushEndEditing: () => dispatch(setEditing(false)),
  pushStartEditing: () => dispatch(setEditing(true)),
  pushCreatedArea: area => dispatch(createArea(area)),
  pushUpdatedAreas: areas => dispatch(updateAreas(areas)),
  pushRemovedArea: areas => dispatch(removeAreas(areas)),
  pushChoosedCreatedArea: () => dispatch(setTarget(LOCAL_CREATED_ID)),
  pushChoosedArea: area => dispatch(setTarget(area)),
  pushAddedPoint: point => dispatch(addPoint(point))
});
