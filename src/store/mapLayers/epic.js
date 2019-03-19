import { flatMap } from "rxjs/operators";
import { ofType } from "redux-observable";

import { layers } from "./constants";
import { requestImpassableAreasLayer } from "./actions";
import { events as mapDataEvents } from "../mapData/constants";

const requests = new Map([
  [layers.impassableAreas, requestImpassableAreasLayer()]
]);

const requestLayersEpic = action$ =>
  action$.pipe(
    ofType(mapDataEvents.setLayers),
    flatMap(({ layers }) =>
      layers
        .filter(layer => requests.has(layer))
        .map(layer => requests.get(layer))
    )
  );

const epic = requestLayersEpic;

export default epic;