import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import L from 'leaflet';

import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import LayerRender from '../LayerRender';
import StaticLayerService from '../StaticLayerService';

// import { setLocalisation } from './helpers';
import LayerEditingContext from './Context';
import { GET_EDITING_LAYER } from './query';

const LayerEditing = ({ children }) => {
  const [editPolicyMap, setEditPolicyMap] = useState(null);
  const { data, loading, error } = useQuery(GET_EDITING_LAYER);

  // useEffect(() => {
  //   setLocalisation(L.drawLocal);
  // }, []);

  const setEditPolicy = useCallback((id, policy) => {
    setEditPolicyMap({ ...editPolicyMap, [id]: policy });
  }, []);

  if (loading || error) return <>{children}</>;

  const { activeEditing } = data;
  const editPolicy = editPolicyMap && editPolicyMap[activeEditing];
  return (
    <LayerEditingContext.Provider value={setEditPolicy}>
      {activeEditing && (
        <FeatureGroup>
          {editPolicy && (
            <EditControl
              position="topright"
              draw={editPolicy.options.draw}
              edit={editPolicy.options.edit}
              onCreated={({ layer: createdLayer }) => editPolicy.onCreateObject(createdLayer)}
              onEdited={({ layers: editedLayers }) => editPolicy.onEditObjects(editedLayers)}
              onDeleted={({ layers: removedLayers }) => editPolicy.onRemoveObjects(removedLayers)}
            />
          )}
          <LayerRender id={activeEditing} />
        </FeatureGroup>
      )}
      {children}
    </LayerEditingContext.Provider>
  );
};

//   function onCreateObject(createdLayer) {
//     pushCreatedObject({
//       json: createdLayer.toGeoJSON()
//     });
//     layer.remove();
//   }

//   function onEditObjects(editedLayers) {
//     const objects = [];
//     editedLayers.eachLayer(editedLayer => {
//       objects.push({
//         id: editedLayer.options.id,
//         json: editedLayer.toGeoJSON()
//       });
//     });
//     pushChangedObjects(objects);
//   }

//   function onRemoveObjects(removedLayers) {
//     const objects = [];
//     removedLayers.eachLayer(removedLayer => {
//       objects.push(removedLayer.options.id);
//     });
//     pushRemovedObjects(objects);
//   }

LayerEditing.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired
};

export default LayerEditing;
