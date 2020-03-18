import { gql } from 'apollo-boost';

const GET_MAP_LAYERS = gql`
  {
    mapLayers: getMapLayerMainSchemes {
      id
    }
  }
`;

export { GET_MAP_LAYERS }; //eslint-disable-line
