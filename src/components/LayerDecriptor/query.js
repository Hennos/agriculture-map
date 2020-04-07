import { gql } from 'apollo-boost';

const GET_LAYER_DESCRIPTOR = gql`
  query MapLayerDescriptor($id: ID!) {
    descriptor: getMapLayer(id: $id) {
      name
      dataSource
      services: servicesSchemes {
        name
      }
      disabled @client
    }
    activeEditing @client
  }
`;

const SET_LAYER_DISABLED = gql`
  mutation SetLayerDisabled($id: ID!, $state: Boolean!) {
    setLayerDisabled(id: $id, state: $state) @client
  }
`;

export { GET_LAYER_DESCRIPTOR, SET_LAYER_DISABLED };
