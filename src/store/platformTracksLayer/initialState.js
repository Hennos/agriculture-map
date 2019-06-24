import { keys } from './constants';

const initialState = Object.fromEntries([
  [keys.status, 'loading'],
  [keys.editing, false],
  [keys.data, []]
]);

export default initialState;
