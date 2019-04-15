import { keys } from './constants';

const initialState = Object.fromEntries([[keys.status, 'loading'], [keys.data, []]]);

export default initialState;
