import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_MAP_LAYER_SCHEME } from './query';

const WithLayerScheme = ({ id, ...props }) => {
  const { data } = useQuery(GET_MAP_LAYER_SCHEME, {
    variables: { id }
  });
  return Component => (data ? <Component id={id} scheme={data.scheme} {...props} /> : null);
};

export default WithLayerScheme;
