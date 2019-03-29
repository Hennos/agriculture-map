import Immutable from 'immutable';

import { keys } from './constants';

const initialState = Immutable.Map([[keys.layers, Immutable.List()], [keys.editableLayer, null]]);

export default initialState;
