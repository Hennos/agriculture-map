import { gql } from 'apollo-boost';

const GET_MAP_LAYER_SCHEME = gql`
  query MapLayerScheme($id: ID!) {
    scheme: getMapLayerSchemeById(id: $id) {
      id
      name
      dataSource
      childLayers {
        id
      }
      services {
        name
        options
      }
      objects {
        dataSourceFeature
        format
      }
    }
  }
`;

export { GET_MAP_LAYER_SCHEME }; //eslint-disable-line
