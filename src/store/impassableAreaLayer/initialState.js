import Immutable from 'immutable';

import { keys } from './constants';

const initialState = Immutable.Map([[keys.status, 'loading'], [keys.data, Immutable.List()]]);

export default initialState;
