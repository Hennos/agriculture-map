import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FeatureGroup, Polygon, Popup } from 'react-leaflet';

import MapBadge from '../MapBadge';
import Editable from '../Editable';
import ObjectDescription from '../ObjectDescription';

import { mapStateToProps, mapDispatchToProps } from './mapToProps';

const ImpassableAreas = ({ editable, areas }) => {
  const editOptions = {
    draw: {
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
    },
    edit: {
      edit: false
    }
  };

  const Areas = () =>
    areas.map(({ id, coordinates }) => (
      <Polygon key={id} id={id} positions={coordinates}>
        <Popup>
          <ObjectDescription id={id} useViewer={() => 'Загружено!'} />
        </Popup>
      </Polygon>
    ));

  return (
    <FeatureGroup>
      <MapBadge position="topright" title="Непроходимые области" />
      {editable ? (
        <Editable options={editOptions}>
          <Areas />
        </Editable>
      ) : (
        <Areas />
      )}
    </FeatureGroup>
  );
};

const areaType = {
  id: PropTypes.string.isRequired,
  coordinates: PropTypes.array.isRequired
};

ImpassableAreas.propTypes = {
  editable: PropTypes.bool,
  areas: PropTypes.arrayOf(PropTypes.shape(areaType)).isRequired
};

ImpassableAreas.defaultProps = {
  editable: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImpassableAreas);
