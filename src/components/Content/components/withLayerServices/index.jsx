import React from 'react';

import LayerService from '../LayerService';

const WithLayerServices = (services, component) => {
  const RenderedLayer = services.reduce(
    (fabricate, { service: serviceName, options: serviceOptions }) => props => (
      <LayerService name={serviceName} options={serviceOptions}>
        {serviceData => fabricate({ ...props, ...serviceData })}
      </LayerService>
    ),
    component
  );
  return <RenderedLayer />;
};

export default WithLayerServices;
