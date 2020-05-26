import gql from 'graphql-tag';

const GET_MAP_LAYERS = gql`
  {
    mapLayers: getMapLayers {
      id
      parentId
    }
  }
`;

export { GET_MAP_LAYERS }; //eslint-disable-line
