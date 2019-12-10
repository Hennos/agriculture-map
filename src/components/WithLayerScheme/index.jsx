import React from 'react';

import WithMapServices from '../WithMapServices';
import StaticDataLoader from '../StaticDataLoader';

const WithLayerScheme = Component =>
  WithMapServices(({ name, services, ...props }) => (
    <StaticDataLoader url={`${services.layers}/schemes/${name}`}>
      {scheme => <Component name={name} scheme={scheme} {...props} />}
    </StaticDataLoader>
  ));

export default WithLayerScheme;
