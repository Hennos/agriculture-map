import React from 'react';

import StaticDataLoader from '../StaticDataLoader';
import WithWebSocketConnection from '../WithWebSocketConnection';

import { urls } from '../../../../app.settings';

const WithGeodataRealtimeService = component => (
  <StaticDataLoader url={urls.realtime}>
    {services => (
      <WithWebSocketConnection service={services.geodata}>{component}</WithWebSocketConnection>
    )}
  </StaticDataLoader>
);

export default WithGeodataRealtimeService;
