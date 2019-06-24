import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import MapBadge from '../MapBadge';

import { mapStateToProps, mapDispatchToProps } from './mapToProps';

class ImpassableAreas extends React.Component {
  onCreateArea = layer => {
    const { pushCreatedArea } = this.props;
    const {
      geometry: { type }
    } = layer.toGeoJSON();
    const coordinates = layer.getLatLngs()[0].map(({ lat, lng }) => [lat, lng]);
    pushCreatedArea({
      type,
      coordinates
    });
    layer.remove();
  };

  onEditAreas = layers => {
    const { pushUpdatedAreas } = this.props;
    const areas = [];
    layers.eachLayer(layer => {
      const {
        geometry: { type }
      } = layer.toGeoJSON();
      const coordinates = layer.getLatLngs()[0].map(({ lat, lng }) => [lat, lng]);
      areas.push({
        id: layer.options.id,
        type,
        coordinates
      });
    });
    pushUpdatedAreas(areas);
  };

  onRemoveArea = layers => {
    const { pushRemovedArea } = this.props;
    const areas = [];
    layers.eachLayer(layer => {
      areas.push(layer.options.id);
    });
    pushRemovedArea(areas);
  };

  onStartCreateTrack = () => {
    const { pushStartEditing, pushChoosedCreatedArea } = this.props;
    pushStartEditing();
    pushChoosedCreatedArea();
  };

  onAddPointToCreated = layers => {
    const { pushAddedPoint } = this.props;
    const layersList = layers.getLayers();
    const { lat, lng } = layersList[layersList.length - 1].getLatLng();
    pushAddedPoint([lat, lng]);
  };

  onStartEditingLayer = () => {
    const { pushStartEditing } = this.props;
    pushStartEditing();
  };

  onStopEditingLayer = () => {
    const { pushEndEditing } = this.props;
    pushEndEditing();
  };

  render() {
    const { editable, areas, pushChoosedArea, editing } = this.props;

    const onEditingHandlers = {
      onCreated: ({ layer }) => this.onCreateArea(layer),
      onEdited: ({ layers }) => this.onEditAreas(layers),
      onDeleted: ({ layers }) => this.onRemoveArea(layers),
      onDrawStart: this.onStartCreateTrack,
      onDrawVertex: ({ layers }) => this.onAddPointToCreated(layers),
      onEditStart: this.onStartEditingLayer,
      onDeleteStart: this.onStartEditingLayer,
      onDrawStop: this.onStopEditingLayer,
      onEditStop: this.onStopEditingLayer,
      onDeleteStop: this.onStopEditingLayer
    };

    const Areas = () =>
      areas.map(({ id, coordinates }) =>
        editing ? (
          <Polygon key={id} id={id} positions={coordinates} />
        ) : (
          <Polygon
            key={id}
            id={id}
            positions={coordinates}
            fillOpacity={0.5}
            onClick={() => pushChoosedArea(id)}
          />
        )
      );

    return (
      <FeatureGroup>
        <Areas />
        {editable && <MapBadge position="topright" title="Непроходимые области" />}
        {editable && (
          <EditControl
            position="topright"
            draw={{
              polygon: {
                shapeOptions: {
                  color: 'red'
                },
                showArea: true
              },
              polyline: false,
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false
            }}
            edit={{
              edit: false
            }}
            {...onEditingHandlers}
          />
        )}
      </FeatureGroup>
    );
  }
}

const areaType = {
  id: PropTypes.string.isRequired,
  coordinates: PropTypes.array.isRequired
};

ImpassableAreas.propTypes = {
  editing: PropTypes.bool.isRequired,
  areas: PropTypes.arrayOf(PropTypes.shape(areaType)).isRequired,
  pushStartEditing: PropTypes.func.isRequired,
  pushEndEditing: PropTypes.func.isRequired,
  pushCreatedArea: PropTypes.func.isRequired,
  pushUpdatedAreas: PropTypes.func.isRequired,
  pushRemovedArea: PropTypes.func.isRequired,
  pushChoosedArea: PropTypes.func.isRequired,
  pushChoosedCreatedArea: PropTypes.func.isRequired,
  pushAddedPoint: PropTypes.func.isRequired,
  editable: PropTypes.bool
};

ImpassableAreas.defaultProps = {
  editable: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImpassableAreas);
