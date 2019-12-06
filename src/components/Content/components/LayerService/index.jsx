import React from 'react';
import PropTypes from 'prop-types';

import StaticLayerService from '../StaticLayerService';
import RealtimeLayerService from '../RealtimeLayerService';
import EditableLayerService from '../EditableLayerService';

const services = new Map([
  ['static', StaticLayerService],
  ['realtime', RealtimeLayerService],
  ['editable', EditableLayerService]
]);

const LayerService = ({ name, options, children }) => {
  const Service = services.get(name);
  return <Service options={options}>{children}</Service>;
};

LayerService.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.shape({}).isRequired,
  children: PropTypes.func.isRequired
};

export default LayerService;
