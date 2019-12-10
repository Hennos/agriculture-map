import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { Map as LeafletMap, WMSTileLayer, FeatureGroup } from 'react-leaflet';

import './index.css';

import settings from '../../settings';

import CompositeLayer from '../CompositeLayer';
import WithWebSocketConnection from '../WithWebSocketConnection';
import FlightTasksPanel from '../FlightTasksPanel';

const Map = () => {
  const [loaded, setLoaded] = useState(false);
  const [options, setOptions] = useState(null);
  const [services, setServices] = useState(null);
  const [layers, setLayers] = useState(null);

  useEffect(() => {
    const requestMapConfig = configUrl => fetch(configUrl).then(response => response.json());
    const requestServices = servicesUrl => fetch(servicesUrl).then(response => response.json());
    const requestLayersList = layersUrl => fetch(layersUrl).then(response => response.json());
    requestMapConfig(settings.urls.config)
      .then(({ origin: [xO, yO], bbox: [luBbox, rbBbox], wms }) => {
        setOptions({
          origin: new L.LatLng(xO, yO),
          bbox: new L.LatLngBounds(luBbox, rbBbox),
          wms
        });
      })
      .then(() => requestServices(settings.urls.services))
      .then(servicesMap => {
        if (servicesMap) {
          setServices(servicesMap);
          return servicesMap;
        }
        throw new Error('Get invalid services list');
      })
      .then(({ layers: layerService }) => requestLayersList(layerService))
      .then(({ layers: layersList }) => {
        if (layersList) {
          setLayers(layersList);
        } else {
          throw new Error('Get invalid layers array');
        }
      })
      .then(() => setLoaded(true))
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    loaded && (
      <WithWebSocketConnection services={services.realtime}>
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
            {layers.map(layer => (
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
