import { createSelector } from 'reselect';

import { keys as layerKeys } from '../../../../store/impassableAreaLayer/constants';
import {
  createArea,
  updateAreas,
  removeAreas
} from '../../../../store/impassableAreaLayer/actions';

const getNormalizedAreas = createSelector(
  state => state.impassableAreasLayer[layerKeys.data],
  areas =>
    areas.map(({ id, coordinates }) => ({
      id,
      coordinates
    }))
);

export const mapStateToProps = state => ({
  areas: getNormalizedAreas(state)
});

export const mapDispatchToProps = dispatch => ({
  pushCreatedArea: area => dispatch(createArea(area)),
  pushUpdatedAreas: areas => dispatch(updateAreas(areas)),
  pushRemoveArea: areas => dispatch(removeAreas(areas))
});
