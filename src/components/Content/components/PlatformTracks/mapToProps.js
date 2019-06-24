import { createSelector } from 'reselect';

import { keys as layerKeys } from '../../../../store/platformTracksLayer/constants';
import {
  setEditing,
  createTrack,
  updateTracks,
  removeTracks
} from '../../../../store/platformTracksLayer/actions';
import { LOCAL_CREATED_ID } from '../../../../store/gpsCoordinates/constants';
import { setTarget, addPoint } from '../../../../store/gpsCoordinates/actions';

const getEditing = state => state.platformTracksLayer[layerKeys.editing];
const getNormalizedTracks = createSelector(
  state => state.platformTracksLayer[layerKeys.data],
  tracks =>
    tracks.map(({ id, coordinates }) => ({
      id,
      coordinates
    }))
);

export const mapStateToProps = state => ({
  editing: getEditing(state),
  tracks: getNormalizedTracks(state)
});

export const mapDispatchToProps = dispatch => ({
  pushEndEditing: () => dispatch(setEditing(false)),
  pushStartEditing: () => dispatch(setEditing(true)),
  pushCreateTrack: track => dispatch(createTrack(track)),
  pushUpdateTracks: tracks => dispatch(updateTracks(tracks)),
  pushRemovedTracks: tracks => dispatch(removeTracks(tracks)),
  pushChoosedCreatedTrack: () => dispatch(setTarget(LOCAL_CREATED_ID)),
  pushChoosedTrack: track => dispatch(setTarget(track)),
  pushAddedPoint: point => dispatch(addPoint(point))
});
