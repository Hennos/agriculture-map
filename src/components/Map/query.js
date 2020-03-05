import { gql } from 'apollo-boost';

const GET_MAP_OPTIONS = gql`
  {
    position: getMapPosition {
      origin
      bounds
    }
    substrate: getMapSubstrate {
      service
      options
    }
  }
`;

export { GET_MAP_OPTIONS };
