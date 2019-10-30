import React from 'react';

import LayerService from '../LayerService';

const withLayerServices = services => Layer =>
  Array.of(services).reduce(
    (component, { name: serviceName, options: serviceOptions }) => (
      <LayerService name={serviceName} options={serviceOptions} component={component} />
    ),
    props => <Layer {...props} />
  );

export default withLayerServices;
