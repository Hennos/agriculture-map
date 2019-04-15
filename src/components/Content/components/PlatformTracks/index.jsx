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
    const { pushRemoveTracks } = this.props;
    const tracks = [];
    layers.eachLayer(layer => {
      tracks.push(layer.options.id);
    });
    pushRemoveTracks(tracks);
  };

  render() {
    const { editable, tracks } = this.props;

    const Tracks = () =>
      tracks.map(({ id, coordinates }) => (
        <Polyline key={id} id={id} color="red" positions={coordinates} />
      ));

    return (
      <FeatureGroup>
        <Tracks />
        {editable && <MapBadge position="topright" title="Траектории пути платформ" />}
        {editable && (
          <EditControl
            position="topright"
            onCreated={({ layer }) => this.onCreateTrack(layer)}
            onEdited={({ layers }) => this.onEditTracks(layers)}
            onDeleted={({ layers }) => this.onRemoveTracks(layers)}
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
          />
        )}
      </FeatureGroup>
    );
  }
}

const trackType = {
  id: PropTypes.number.isRequired,
  coordinates: PropTypes.array.isRequired
};

PlatformTracks.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape(trackType)).isRequired,
  pushCreateTrack: PropTypes.func.isRequired,
  pushUpdateTracks: PropTypes.func.isRequired,
  pushRemoveTracks: PropTypes.func.isRequired,
  editable: PropTypes.bool
};

PlatformTracks.defaultProps = {
  editable: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlatformTracks);
