import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { Map as LeafletMap, WMSTileLayer, FeatureGroup } from 'react-leaflet';

import './index.css';

import settings from '../../settings';

import CompositeLayer from '../CompositeLayer';
import WithWebSocketConnection from '../WithWebSocketConnection';
import FlightTasksPanel from '../FlightTasksPanel';

const Map = () => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const requestMapConfig = configUrl => fetch(configUrl).then(response => response.json());
    requestMapConfig(settings.urls.config)
      .then(({ origin: [xO, yO], bbox: [luBbox, rbBbox], wms, layers }) => {
        setOptions({
          origin: new L.LatLng(xO, yO),
          bbox: new L.LatLngBounds(luBbox, rbBbox),
          wms,
          layers
        });
      })
      .catch(err => {
        throw err;
      });
  }, []);

  return (
    options && (
      <WithWebSocketConnection>
        <LeafletMap
          id="root-map"
          bounds={options.bbox}
          maxBounds={options.bbox}
          center={options.origin}
          zoom={0}
          zoomControl={false}
          crs={L.CRS.EPSG3857}
        >
          <WMSTileLayer {...options.wms} crs={L.CRS.EPSG3857} />
          <FeatureGroup>
            {options.layers.map(layer => (
              <CompositeLayer key={layer} name={layer} />
            ))}
          </FeatureGroup>
          <FlightTasksPanel position="topleft" />
        </LeafletMap>
      </WithWebSocketConnection>
    )
  );
};

export default Map;
