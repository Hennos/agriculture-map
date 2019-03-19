import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Map as LeafletMap, TileLayer, FeatureGroup } from 'react-leaflet';
import { connect } from 'react-redux';

import './index.css';

import { keys } from '../../../../store/mapData/constants';
import { setLayers } from '../../../../store/mapData/actions';

import MapLayerPresenter from '../MapLayerPresenter';

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
    return new L.LatLngBounds([0, width], [-height, 0]);
  }

  render() {
    const { layers } = this.props;
    const { loaded, config } = this.state;
    return (
      loaded && (
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
            {layers.map(layer => (
              <MapLayerPresenter key={layer} presented={layer} />
            ))}
          </FeatureGroup>
        </LeafletMap>
      )
    );
  }
}

Map.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.string).isRequired,
  setMapLayers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  layers: state.mapData.get(keys.layers).toArray()
});

const mapDispatchToProps = dispatch => ({
  setMapLayers: layers => dispatch(setLayers(layers))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
