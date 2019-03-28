import { events } from './constants';

export const createTrack = track => ({
  type: events.createTrack,
  track
});
export const updateTracks = tracks => ({
  type: events.updateTracks,
  tracks
});
export const removeTracks = tracks => ({
  type: events.removeTracks,
  tracks
});

export const requestData = () => ({
  type: events.requestData
});
export const successLoadData = data => ({
  type: events.successLoadData,
  data
});
export const errorLoadData = error => ({
  type: events.errorLoadData,
  error
});

export const successPostData = () => ({
  type: events.successPostData
});
export const errorPostData = error => ({
  type: events.errorPostData,
  error
});
