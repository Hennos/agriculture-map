import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { LayerGroup, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import MapBadge from '../MapBadge';

const ObjectsLayer = ({ useObjects, ...layer }) => {
  const { name, editable } = layer;
  return (
    <LayerGroup>
      <FeatureGroup>
        {useObjects()}
        {editable && <MapBadge position="topright" title={name} />}
        {editable && (
          <EditControl
            position="topright"
            draw={{
              polygon: false,
              polyline: false,
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false
            }}
            edit={{
              edit: false
            }}
          />
        )}
      </FeatureGroup>
    </LayerGroup>
  );
};

ObjectsLayer.propTypes = {
  useObjects: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  editable: PropTypes.bool
};

ObjectsLayer.defaultProps = {
  editable: false
};

export default ObjectsLayer;
