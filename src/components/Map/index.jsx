import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import L from 'leaflet';
import { Map as LeafletMap, WMSTileLayer, FeatureGroup } from 'react-leaflet';

import { GET_MAP_OPTIONS } from './query';

import './index.css';

import CompositeLayer from '../CompositeLayer';
import WithWebSocketConnection from '../WithWebSocketConnection';
import FlightTasksPanel from '../FlightTasksPanel';

const Map = () => {
  const { loading, error, data } = useQuery(GET_MAP_OPTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { position, substrate } = data;
  return (
    // <WithWebSocketConnection>
    <LeafletMap
      id="root-map"
      bounds={position.bounds}
      maxBounds={position.bounds}
      center={position.origin}
      zoom={0}
      zoomControl={false}
      crs={L.CRS.EPSG3857}
    >
      {substrate.service === 'wms' ? (
        <WMSTileLayer
          {...substrate.options}
          crs={substrate.crs === '3857' ? L.CRS.EPSG3857 : L.CRS.EPSG4326}
        />
      ) : null}
      <FeatureGroup>
        {/* {options.layers.map(layer => (
            <CompositeLayer key={layer} name={layer} />
          ))} */}
      </FeatureGroup>
      {/* <FlightTasksPanel position="topleft" /> */}
    </LeafletMap>
    // </WithWebSocketConnection>
  );
};

export default Map;
