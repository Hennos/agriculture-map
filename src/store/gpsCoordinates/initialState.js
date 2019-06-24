import { keys } from './constants';

const initialState = Object.fromEntries([
  [keys.target, null],
  [keys.pointsId, []],
  [keys.points, {}]
]);

export default initialState;
