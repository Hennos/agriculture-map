import { events } from "./constants";

export const setBoundsGeometry = geometry => ({
  type: events.setBoundsGeometry,
  geometry
});
