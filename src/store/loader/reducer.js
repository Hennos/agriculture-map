import { loadStatusEnum, events, keys } from './constants';
import initialState from './initialState';

const handleLoadLegend = prevState =>
  prevState.set(keys.legendLoadStatus, loadStatusEnum.loading);
const handleSuccessLoadLegend = prevState =>
  prevState.set(keys.legendLoadStatus, loadStatusEnum.success);
const handleErrorLoadLegend = (prevState, { error }) =>
  prevState
    .set(keys.errorMsgLoadLegend, error)
    .set(keys.legendLoadStatus, loadStatusEnum.error);

const handleLoadUserStatus = prevState =>
  prevState.set(keys.userStatusLoadStatus, loadStatusEnum.loading);
const handleSuccessLoadUserStatus = prevState =>
  prevState.set(keys.userStatusLoadStatus, loadStatusEnum.success);
const handleErrorLoadUserStatus = (prevState, { error }) =>
  prevState
    .set(keys.errorMsgLoadUserStatus, error)
    .set(keys.userStatusLoadStatus, loadStatusEnum.error);

const handleLoadAreaProperties = prevState =>
  prevState.set(keys.areaPropertiesLoadStatus, loadStatusEnum.loading);
const handleSuccessLoadAreaProperties = prevState =>
  prevState.set(keys.areaPropertiesLoadStatus, loadStatusEnum.success);
const handleErrorLoadAreaProperties = (prevState, { error }) =>
  prevState
    .set(keys.errorMsgAreaProperties, error)
    .set(keys.areaPropertiesLoadStatus, loadStatusEnum.error);

const handleLoadFilters = prevState =>
  prevState.set(keys.filtersLoadStatus, loadStatusEnum.loading);
const handleSuccessLoadFilters = prevState =>
  prevState.set(keys.filtersLoadStatus, loadStatusEnum.success);
const handleErrorLoadFilters = (prevState, { error }) =>
  prevState
    .set(keys.errorMsgFilters, error)
    .set(keys.filtersLoadStatus, loadStatusEnum.error);

const handlers = new Map([
  [events.loadLegend, handleLoadLegend],
  [events.successLoadLegend, handleSuccessLoadLegend],
  [events.errorLoadLegend, handleErrorLoadLegend],
  [events.loadUserStatus, handleLoadUserStatus],
  [events.successLoadUserStatus, handleSuccessLoadUserStatus],
  [events.errorLoadUserStatus, handleErrorLoadUserStatus],
  [events.loadAreaPropertries, handleLoadAreaProperties],
  [events.successLoadAreaPropertries, handleSuccessLoadAreaProperties],
  [events.errorLoadAreaPropertries, handleErrorLoadAreaProperties],
  [events.loadFilters, handleLoadFilters],
  [events.successLoadFilters, handleSuccessLoadFilters],
  [events.errorLoadFilters, handleErrorLoadFilters],
]);

export default function (state = initialState, action) {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
}
