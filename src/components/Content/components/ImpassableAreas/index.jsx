import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import { keys as layerKeys } from '../../../../store/impassableAreaLayer/constants';
import {
  createArea,
  updateAreas,
  removeAreas
} from '../../../../store/impassableAreaLayer/actions';

import MapBadge from '../MapBadge';

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
    const { pushRemoveArea } = this.props;
    const areas = [];
    layers.eachLayer(layer => {
      areas.push(layer.options.id);
    });
    pushRemoveArea(areas);
  };

  render() {
    const { editable, areas } = this.props;

    const Areas = () =>
      areas.map(({ id, coordinates }) => <Polygon key={id} id={id} positions={coordinates} />);

    return (
      <FeatureGroup>
        <Areas />
        {editable && <MapBadge position="topright" title="Непроходимые области" />}
        {editable && (
          <EditControl
            position="topright"
            onCreated={({ layer }) => this.onCreateArea(layer)}
            onEdited={({ layers }) => this.onEditAreas(layers)}
            onDeleted={({ layers }) => this.onRemoveArea(layers)}
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
          />
        )}
      </FeatureGroup>
    );
  }
}

const areaType = {
  id: PropTypes.number.isRequired,
  coordinates: PropTypes.array.isRequired
};

ImpassableAreas.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.shape(areaType)).isRequired,
  pushCreatedArea: PropTypes.func.isRequired,
  pushUpdatedAreas: PropTypes.func.isRequired,
  pushRemoveArea: PropTypes.func.isRequired,
  editable: PropTypes.bool
};

ImpassableAreas.defaultProps = {
  editable: false
};

const mapStateToProps = ({ impassableAreasLayer }) => ({
  areas: impassableAreasLayer
    .get(layerKeys.data)
    .map(({ id, coordinates }) => ({
      id,
      coordinates
    }))
    .toArray()
});

const mapDispatchToProps = dispatch => ({
  pushCreatedArea: area => dispatch(createArea(area)),
  pushUpdatedAreas: areas => dispatch(updateAreas(areas)),
  pushRemoveArea: areas => dispatch(removeAreas(areas))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImpassableAreas);
