import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import L from "leaflet";

// import DebugTileLayer from "../DebugTileLayer";

import "./index.css";

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      config: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/config")
      .then(response => {
        response.json().then(({ mapWidth, mapHeight, maxZoom }) => {
          this.setState({
            loaded: true,
            config: {
              width: mapWidth,
              height: mapHeight,
              maxZoom
            }
          });
        });
      })
      .catch(err => {
        throw err;
      });
  }

  getMaxBounds() {
    const { width, height } = this.state.config;
    return new L.LatLngBounds([0, width], [-height, 0]);
  }

  render() {
    const { loaded, config } = this.state;
    return (
      loaded && (
        <LeafletMap
          id="root-map"
          crs={L.CRS.Simple}
          maxBounds={this.getMaxBounds()}
          center={[0, 0]}
          zoom={0}
          minZoom={0}
          maxZoom={config.maxZoom}
          maxBoundsViscosity={1.0}
          zoomControl={false}
        >
          <TileLayer url="http://localhost:3001/tiles/{z}/{y}/{x}" />
        </LeafletMap>
      )
    );
  }
}

export default Map;
