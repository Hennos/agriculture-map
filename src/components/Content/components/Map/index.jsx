import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Map as LeafletMap, TileLayer, FeatureGroup } from 'react-leaflet';
import { connect } from 'react-redux';

import './index.css';

// import EditableLayerControl from '../EditableLayerControl';
// import MapLayersPresenter from '../MapLayersPresenter';
// import PointViewer from '../PointsViewer';
// import StaticDataLoader from '../StaticDataLoader';
import CompositeLayer from '../CompositeLayer';
import WithGeodataRealtimeService from '../WithGeodataRealtimeService';

import { mapStateToProps, mapDispatchToProps } from './mapToProps';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      config: null
    };
  }

  componentDidMount() {
    const { setMapLayers } = this.props;
    fetch('http://localhost:3001/config')
      .then(response => {
        response.json().then(({ mapWidth, mapHeight, maxZoom, layers }) => {
          setMapLayers(layers);
          this.setState({
            loaded: true,
            config: {
              width: mapWidth,
              height: mapHeight,
              maxZoom
            }
          });
        });
      })
      .catch(err => {
        throw err;
      });
  }

  getMaxBounds() {
    const {
      config: { width, height }
    } = this.state;
    const OFFSET = 100;
    return new L.LatLngBounds([OFFSET, width + OFFSET], [-height - OFFSET, -OFFSET]);
  }

  render() {
    const { layers, editableLayer, chooseEditableLayer } = this.props;
    const { loaded, config } = this.state;
    return (
      loaded &&
      WithGeodataRealtimeService(
        <LeafletMap
          id="root-map"
          crs={L.CRS.Simple}
          maxBounds={this.getMaxBounds()}
          center={[0, 0]}
          zoom={0}
          minZoom={0}
          maxZoom={config.maxZoom}
          maxBoundsViscosity={1.0}
          zoomControl={false}
        >
          <TileLayer url="http://localhost:3001/tiles/{z}/{x}/{y}" />
          <FeatureGroup>
            {/* {layers.map(layer => (
              <DataLayerRender key={layer} layer={layer} />
            ))} */}
            <CompositeLayer name={0} />
          </FeatureGroup>
          {/* <PointViewer />
          {!!layers.length && (
            <EditableLayerControl
              position="topright"
              editable={editableLayer}
              layers={layers}
              onChooseEditableLayer={chooseEditableLayer}
            />
          )}
          <FeatureGroup>
            {layers.map(layer => (
              <MapLayersPresenter
                key={layer}
                presented={layer}
                editable={layer === editableLayer}
              />
            ))}
          </FeatureGroup> */}
        </LeafletMap>
      )
    );
  }
}

Map.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.string).isRequired,
  setMapLayers: PropTypes.func.isRequired,
  chooseEditableLayer: PropTypes.func.isRequired,
  editableLayer: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
};

Map.defaultProps = {
  editableLayer: null
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
