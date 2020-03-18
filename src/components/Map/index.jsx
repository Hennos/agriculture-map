import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import L from 'leaflet';
import { Map as LeafletMap, WMSTileLayer, FeatureGroup } from 'react-leaflet';

import { GET_MAP_OPTIONS } from './query';

import './index.css';

import MapLayers from '../MapLayers';

const Map = () => {
  const { loading, error, data } = useQuery(GET_MAP_OPTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const {
    position,
    substrate: { service: subService, crs: subCrs, options: subOptions }
  } = data;
  return (
    <LeafletMap
      id="root-map"
      bounds={position.bounds}
      maxBounds={position.bounds}
      center={position.origin}
      zoom={0}
      zoomControl={false}
      crs={L.CRS.EPSG3857}
    >
      {subService === 'wms' ? (
        <WMSTileLayer
          url={subOptions.url}
          layers={subOptions.layers}
          tiled={subOptions.tiled}
          crs={subCrs === '3857' ? L.CRS.EPSG3857 : L.CRS.EPSG4326}
        />
      ) : null}
      <FeatureGroup>
        <MapLayers />
      </FeatureGroup>
    </LeafletMap>
  );
};

export default Map;
