import gql from 'graphql-tag';

const GET_MAP_OPTIONS = gql`
  {
    position: getMapPosition {
      origin
      bounds
    }
    substrate: getMapSubstrate {
      service
      crs
      options
    }
  }
`;

export { GET_MAP_OPTIONS }; //eslint-disable-line
