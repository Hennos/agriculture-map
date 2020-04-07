import { gql } from 'apollo-boost';

const GET_MAP_LAYER_SCHEME = gql`
  query MapLayerScheme($id: ID!) {
    scheme: getMapLayer(id: $id) {
      id
      name
      dataSource
      disabled @client
      child: childLayers {
        id
      }
      services: servicesSchemes {
        name
        options
      }
      objectsTypes: objectsSchemes {
        dataSourceFeature
        format
      }
    }
  }
`;

export { GET_MAP_LAYER_SCHEME }; //eslint-disable-line
