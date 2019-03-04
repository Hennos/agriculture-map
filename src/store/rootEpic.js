import { combineEpics } from "redux-observable";

import loader from "./loader/epic";

const rootEpic = loader;

export default rootEpic;
