import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { FeatureGroup } from 'react-leaflet';

import { GET_COMPOSITE_MAP_LAYER } from './query';

import LayerRender from '../LayerRender';
import EditPolicy from '../EditPolicy';

const CompositeLayer = ({ id: rootId }) => {
  const { loading, error, data } = useQuery(GET_COMPOSITE_MAP_LAYER, {
    variables: { id: rootId }
  });

  const editPolicy = useMemo(
    () => ({
      options: {
        draw: {
          polygon: {
            shapeOptions: {
              color: 'red'
            }
          },
          polyline: false,
          rectangle: false,
          circle: false,
          circlemarker: false,
          marker: false
        }
      },
      onCreateObject: () => {},
      onEditObjects: () => {},
      onRemoveObjects: () => {}
    }),
    []
  );

  if (loading || error) return null;

  const {
    layerOptions: { disabled },
    unfoldedCompositeLayer,
    activeEditing
  } = data;

  return (
    !disabled && (
      <FeatureGroup>
        {unfoldedCompositeLayer
          .filter(({ id: leafId }) => leafId !== activeEditing)
          .map(({ id: leafId }) => (
            <FeatureGroup key={leafId}>
              <EditPolicy layer={leafId} policy={editPolicy} />
              <LayerRender id={leafId} />
            </FeatureGroup>
          ))}
      </FeatureGroup>
    )
  );
};

CompositeLayer.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default CompositeLayer;
