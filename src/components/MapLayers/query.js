import gql from 'graphql-tag';

const GET_INTERACTING_LAYERS = gql`
  query GetInteractingLayers {
    mapLayers: getMapLayers {
      id
      parentId
    }
  }
`;

export { GET_INTERACTING_LAYERS }; //eslint-disable-line
