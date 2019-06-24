import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FeatureGroup, Polyline } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import MapBadge from '../MapBadge';

import { mapStateToProps, mapDispatchToProps } from './mapToProps';

class PlatformTracks extends React.Component {
  onCreateTrack = layer => {
    const { pushCreateTrack } = this.props;
    const {
      geometry: { type }
    } = layer.toGeoJSON();
    const coordinates = layer.getLatLngs().map(({ lat, lng }) => [lat, lng]);
    pushCreateTrack({
      type,
      coordinates
    });
    layer.remove();
  };

  onEditTracks = layers => {
    const { pushUpdateTracks } = this.props;
    const tracks = [];
    layers.eachLayer(layer => {
      const {
        geometry: { type }
      } = layer.toGeoJSON();
      const coordinates = layer.getLatLngs().map(({ lat, lng }) => [lat, lng]);
      tracks.push({
        id: layer.options.id,
        type,
        coordinates
      });
    });
    pushUpdateTracks(tracks);
  };

  onRemoveTracks = layers => {
    const { pushRemovedTracks } = this.props;
    const tracks = [];
    layers.eachLayer(layer => {
      tracks.push(layer.options.id);
    });
    pushRemovedTracks(tracks);
  };

  onStartCreateTrack = () => {
    const { pushStartEditing, pushChoosedCreatedTrack } = this.props;
    pushStartEditing();
    pushChoosedCreatedTrack();
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
    const { editable, tracks, pushChoosedTrack, editing } = this.props;

    const onEditingHandlers = {
      onDrawStart: this.onStartCreateTrack,
      onDrawVertex: ({ layers }) => this.onAddPointToCreated(layers),
      onEditStart: this.onStartEditingLayer,
      onDeleteStart: this.onStartEditingLayer,
      onDrawStop: this.onStopEditingLayer,
      onEditStop: this.onStopEditingLayer,
      onDeleteStop: this.onStopEditingLayer
    };

    const Tracks = () =>
      tracks.map(({ id, coordinates }) =>
        editing ? (
          <Polyline key={id} id={id} positions={coordinates} />
        ) : (
          <Polyline key={id} id={id} positions={coordinates} onClick={() => pushChoosedTrack(id)} />
        )
      );

    return (
      <FeatureGroup>
        <Tracks />
        {editable && <MapBadge position="topright" title="Траектории пути платформ" />}
        {editable && (
          <EditControl
            position="topright"
            draw={{
              polyline: {
                shapeOptions: {
                  color: 'red'
                }
              },
              polygon: false,
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false
            }}
            onCreated={({ layer }) => this.onCreateTrack(layer)}
            onEdited={({ layers }) => this.onEditTracks(layers)}
            onDeleted={({ layers }) => this.onRemoveTracks(layers)}
            {...onEditingHandlers}
          />
        )}
      </FeatureGroup>
    );
  }
}

const trackType = {
  id: PropTypes.string.isRequired,
  coordinates: PropTypes.array.isRequired
};

PlatformTracks.propTypes = {
  editing: PropTypes.bool.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape(trackType)).isRequired,
  pushStartEditing: PropTypes.func.isRequired,
  pushEndEditing: PropTypes.func.isRequired,
  pushCreateTrack: PropTypes.func.isRequired,
  pushUpdateTracks: PropTypes.func.isRequired,
  pushRemovedTracks: PropTypes.func.isRequired,
  pushChoosedTrack: PropTypes.func.isRequired,
  pushChoosedCreatedTrack: PropTypes.func.isRequired,
  pushAddedPoint: PropTypes.func.isRequired,
  editable: PropTypes.bool
};

PlatformTracks.defaultProps = {
  editable: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlatformTracks);
