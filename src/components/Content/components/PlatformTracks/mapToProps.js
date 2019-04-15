import { createSelector } from 'reselect';

import { keys as layerKeys } from '../../../../store/platformTracksLayer/constants';
import {
  createTrack,
  updateTracks,
  removeTracks
} from '../../../../store/platformTracksLayer/actions';

const getNormalizedTracks = createSelector(
  state => state.platformTracksLayer[layerKeys.data],
  tracks =>
    tracks.map(({ id, coordinates }) => ({
      id,
      coordinates
    }))
);

export const mapStateToProps = state => ({
  tracks: getNormalizedTracks(state)
});

export const mapDispatchToProps = dispatch => ({
  pushCreateTrack: track => dispatch(createTrack(track)),
  pushUpdateTracks: tracks => dispatch(updateTracks(tracks)),
  pushRemoveTracks: tracks => dispatch(removeTracks(tracks))
});
