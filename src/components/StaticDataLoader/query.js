import { gql } from 'apollo-boost';

const GET_MAP_LAYER_OBJECTS = gql`
  query MapLayerObjects($dataSource: ID!) {
    scheme: getMapLayerObjects(layerId: $dataSource) {
      objects
    }
  }
`;

export { GET_MAP_LAYER_OBJECTS }; //eslint-disable-line
