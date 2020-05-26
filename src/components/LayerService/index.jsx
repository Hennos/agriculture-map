import React from 'react';
import PropTypes from 'prop-types';

import StaticLayerService from '../StaticLayerService';
import RealtimeLayerService from '../RealtimeLayerService';

const services = new Map([['static', StaticLayerService], ['realtime', RealtimeLayerService]]);

const LayerService = ({ name, options, layerScheme, children }) => {
  const Service = services.get(name);
  return (
    <Service layerScheme={layerScheme} options={options}>
      {children}
    </Service>
  );
};

LayerService.propTypes = {
  layerScheme: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.shape({}),
  children: PropTypes.func.isRequired
};

LayerService.defaultProps = {
  options: {}
};

export default LayerService;
