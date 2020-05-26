import gql from 'graphql-tag';

const GET_MAP_LAYER_SCHEME = gql`
  query MapLayerScheme($id: ID!) {
    scheme: getMapLayer(id: $id) {
      id
      name
      dataSource
      services: servicesSchemes {
        name
        options
      }
      objectsTypes: objectsSchemes {
        dataSourceFeature
        format
      }
    }
    activeEditing @client
  }
`;

export { GET_MAP_LAYER_SCHEME }; //eslint-disable-line
