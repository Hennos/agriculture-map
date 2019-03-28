import Immutable from 'immutable';

import { keys } from './constants';

const initialState = Immutable.Map([[keys.layers, Immutable.List()]]);

export default initialState;
