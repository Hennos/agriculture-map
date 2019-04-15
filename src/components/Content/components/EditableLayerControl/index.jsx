import React from 'react';
import PropTypes from 'prop-types';
import Control from 'react-leaflet-control';

import { layers as layerTypes } from '../../../../store/mapLayers/constants';

import './index.css';

const layerSignature = new Map([
  [layerTypes.impassableAreas, 'Непроходимые области'],
  [layerTypes.platformTracks, 'Траектории пути платформ']
]);

const EditableLayerControl = ({ position, editable, layers, onChooseEditableLayer }) => (
  <Control position={position}>
    <form className="editable-layer-control">
      <p className="content-row">Редактирование данных</p>
      {layers.map(layerType => (
        <button
          key={layerType}
          className="content-row option"
          type="button"
          onClick={() => onChooseEditableLayer(layerType)}
        >
          <input
            name="editableLayerFlag"
            type="radio"
            value={layerType}
            checked={layerType === editable}
            readOnly
          />
          {layerSignature.get(layerType)}
        </button>
      ))}
    </form>
  </Control>
);

EditableLayerControl.propTypes = {
  position: PropTypes.string,
  editable: PropTypes.string,
  layers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChooseEditableLayer: PropTypes.func
};

EditableLayerControl.defaultProps = {
  position: 'topright',
  editable: '',
  onChooseEditableLayer: () => {}
};

export default EditableLayerControl;
