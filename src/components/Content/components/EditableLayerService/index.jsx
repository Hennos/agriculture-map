import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import { createObject, changeObjects, removeObjects } from '../../../../store/edit/actions';

const EditableLayerService = ({
  options: { draw, edit },
  children,
  pushCreatedObject,
  pushChangedObjects,
  pushRemovedObjects
}) => {
  function onCreateObject(layer) {
    pushCreatedObject({
      json: layer.toGeoJSON()
    });
    layer.remove();
  }

  function onEditObjects(layers) {
    const objects = [];
    layers.eachLayer(layer => {
      objects.push({
        id: layer.options.id,
        json: layer.toGeoJSON()
      });
    });
    pushChangedObjects(objects);
  }

  function onRemoveObjects(layers) {
    const objects = [];
    layers.eachLayer(layer => {
      objects.push(layer.options.id);
    });
    pushRemovedObjects(objects);
  }

  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        draw={{ ...draw }}
        edit={{ ...edit }}
        onCreated={({ layer }) => onCreateObject(layer)}
        onEdited={({ layers }) => onEditObjects(layers)}
        onDeleted={({ layers }) => onRemoveObjects(layers)}
      />
      {children}
    </FeatureGroup>
  );
};

const optionsType = {
  draw: PropTypes.object,
  edit: PropTypes.object
};

EditableLayerService.propTypes = {
  options: PropTypes.shape(optionsType).isRequired,
  children: PropTypes.oneOfType(PropTypes.arrayOf(PropTypes.element), PropTypes.element.isRequired)
    .isRequired,
  pushCreatedObject: PropTypes.func.isRequired,
  pushChangedObjects: PropTypes.func.isRequired,
  pushRemovedObjects: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  pushCreatedObject: object => dispatch(createObject(object)),
  pushChangedObjects: objects => dispatch(changeObjects(objects)),
  pushRemovedObjects: objects => dispatch(removeObjects(objects))
});

export default connect(
  null,
  mapDispatchToProps
)(EditableLayerService);
