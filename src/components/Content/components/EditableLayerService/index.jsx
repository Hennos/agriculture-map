import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';

import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import { setLocalisationDraw } from './helpers';

import { createObject, changeObjects, removeObjects } from '../../../../store/edit/actions';

// const RealtimeLayerService = ({ options, children }) => (
//   <WebSocketContext.Consumer>
//     {channels => (
//       <RealtimeDataLoader
//         socket={channels.geodata}
//         options={{
//           request: 'ws_ask_layer_objects',
//           response: 'ws_send_layer_objects',
//           delay: options.delay,
//           layer: options.layer
//         }}
//       >
//         {({ objects }) => children({ objects })}
//       </RealtimeDataLoader>
//     )}
//   </WebSocketContext.Consumer>
// );

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

  function onCreateObject(layer) {
    console.log(JSON.stringify(layer.toGeoJSON()));
    pushCreatedObject({
      json: layer.toGeoJSON()
    });
    // layer.remove();
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
