import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';

import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import { setLocalisationDraw } from './helpers';

import { createObject, changeObjects, removeObjects } from '../../store/edit/actions';

const EditableLayerService = ({
  layer,
  options: { draw, edit },
  children,
  pushCreatedObject,
  pushChangedObjects,
  pushRemovedObjects
}) => {
  useEffect(() => {
    setLocalisationDraw(L.drawLocal);
  }, []);

  function onCreateObject(createdLayer) {
    console.log(JSON.stringify(createdLayer.toGeoJSON()));
    pushCreatedObject({
      json: createdLayer.toGeoJSON()
    });
    // layer.remove();
  }

  function onEditObjects(editedLayers) {
    const objects = [];
    editedLayers.eachLayer(editedLayer => {
      objects.push({
        id: editedLayer.options.id,
        json: editedLayer.toGeoJSON()
      });
    });
    pushChangedObjects(objects);
  }

  function onRemoveObjects(removedLayers) {
    const objects = [];
    removedLayers.eachLayer(removedLayer => {
      objects.push(removedLayer.options.id);
    });
    pushRemovedObjects(objects);
  }

  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        draw={{ ...draw }}
        edit={{ ...edit }}
        onCreated={({ layer: createdLayer }) => onCreateObject(createdLayer)}
        onEdited={({ layers: editedLayers }) => onEditObjects(editedLayers)}
        onDeleted={({ layers: removedLayers }) => onRemoveObjects(removedLayers)}
      />
      {children()}
    </FeatureGroup>
  );
};

const optionsType = {
  draw: PropTypes.object,
  edit: PropTypes.object
};

EditableLayerService.propTypes = {
  layer: PropTypes.string.isRequired,
  options: PropTypes.shape(optionsType).isRequired,
  children: PropTypes.func.isRequired,
  pushCreatedObject: PropTypes.func.isRequired,
  pushChangedObjects: PropTypes.func.isRequired,
  pushRemovedObjects: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  pushCreatedObject: object => {},
  pushChangedObjects: objects => {},
  pushRemovedObjects: objects => {}
});

export default connect(
  null,
  mapDispatchToProps
)(EditableLayerService);
