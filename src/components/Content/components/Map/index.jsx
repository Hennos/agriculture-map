import React from "react";
import {
  Map as LeafletMap,
  withLeaflet,
  TileLayer,
  CircleMarker
} from "react-leaflet";
import L from "leaflet";

import DebugTileLayer from "../DebugTileLayer";

import "./index.css";

class Map extends React.Component {
  componentDidMount() {
    window.dispatchEvent(new Event("resize"));
  }

  render() {
    return (
      <LeafletMap
        id="root-map"
        crs={L.CRS.Simple}
        maxBounds={[[-20, 0], [-(5 * 256) - 60, 7 * 256 - 20]]}
        center={[0, 0]}
        zoom={0}
        minZoom={0}
        maxZoom={0}
        maxBoundsViscosity={1.0}
      >
        <TileLayer url="http://localhost:3001/tiles/{z}/{y}/{x}" />
        <CircleMarker center={[-20, 0]} />
      </LeafletMap>
    );
  }
}

export default Map;
