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

const LayerService = ({ name, options, component }) => {
  const Service = services(name);
  return <Service options={options} component={component} />;
};

LayerService.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.shape({}).isRequired,
  component: PropTypes.func.isRequired
};

export default LayerService;
