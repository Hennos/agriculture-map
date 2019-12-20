import React from 'react';

import LayerService from '../LayerService';

const WithLayerServices = (services, scheme, component) => {
  const RenderedLayer = services.reduce(
    (fabricate, { service: serviceName, options: serviceOptions }) => props => (
      <LayerService name={serviceName} options={serviceOptions} layerScheme={scheme}>
        {serviceData => fabricate({ ...props, ...serviceData })}
      </LayerService>
    ),
    component
  );
  return <RenderedLayer />;
};

export default WithLayerServices;
