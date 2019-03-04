import Immutable from 'immutable';

import { loadStatusEnum, keys } from './constants';

const initialState = Immutable.Map([
  [keys.legendLoadStatus, loadStatusEnum.none],
  [keys.errorMsgLoadLegend, ''],
  [keys.userStatusLoadStatus, loadStatusEnum.none],
  [keys.errorMsgLoadUserStatus, ''],
  [keys.areaPropertiesLoadStatus, loadStatusEnum.none],
  [keys.errorMsgAreaProperties, ''],
  [keys.filtersLoadStatus, loadStatusEnum.none],
  [keys.errorMsgFilters, ''],
]);

export default initialState;

