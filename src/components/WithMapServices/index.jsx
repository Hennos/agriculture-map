import React from 'react';

import StaticDataLoader from '../StaticDataLoader';

import settings from '../../settings';

const WithMapServices = Component => props => (
  <StaticDataLoader url={settings.urls.services}>
    {services => <Component services={services} {...props} />}
  </StaticDataLoader>
);

export default WithMapServices;
