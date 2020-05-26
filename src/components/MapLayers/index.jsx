import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FeatureGroup } from 'react-leaflet';

import CompositeLayer from '../CompositeLayer';

import { GET_INTERACTING_LAYERS } from './query';

import LayerEditing from '../LayerEditing';

const MapLayers = () => {
  const { data, loading, error } = useQuery(GET_INTERACTING_LAYERS);

  if (loading || error) return null;

  return (
    <LayerEditing>
      <FeatureGroup>
        {data.mapLayers
          .filter(({ parentId }) => !parentId)
          .map(({ id }) => (
            <CompositeLayer key={id} id={id} />
          ))}
      </FeatureGroup>
    </LayerEditing>
  );
};

export default MapLayers;
