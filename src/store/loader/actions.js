import { events } from './constants';

const requestLoadAppData = () => ({
  type: events.requestLoadAppData
});

const loadLegend = () => ({
  type: events.loadLegend
});
const successLoadLegend = data => ({
  type: events.successLoadLegend,
  data
});
const errorLoadLegend = error => ({
  type: events.errorLoadLegend,
  error
});

const loadUserStatus = () => ({
  type: events.loadUserStatus
});
const successLoadUserStatus = data => ({
  type: events.successLoadUserStatus,
  data
});
const errorLoadUserStatus = error => ({
  type: events.errorLoadUserStatus,
  error
});

const loadAreaPropertries = () => ({
  type: events.loadAreaPropertries
});
const successLoadAreaPropertries = data => ({
  type: events.successLoadAreaPropertries,
  data
});
const errorLoadAreaPropertries = error => ({
  type: events.errorLoadAreaPropertries,
  error
});

const loadFilters = () => ({
  type: events.loadFilters
});
const successLoadFilters = data => ({
  type: events.successLoadFilters,
  data
});
const errorLoadFilters = error => ({
  type: events.errorLoadFilters,
  error
});

export {
  requestLoadAppData,
  loadLegend,
  successLoadLegend,
  errorLoadLegend,
  loadUserStatus,
  successLoadUserStatus,
  errorLoadUserStatus,
  loadAreaPropertries,
  successLoadAreaPropertries,
  errorLoadAreaPropertries,
  loadFilters,
  successLoadFilters,
  errorLoadFilters
};
