import { gql } from 'apollo-boost';

const GET_OBJECTS_DATA = gql`
  query GetObjectsData($id: ID!) {
    mapLayer: getMapLayer(id: $id) {
      id
      objectsGeodata
    }
  }
`;

export { GET_OBJECTS_DATA }; //eslint-disable-line
