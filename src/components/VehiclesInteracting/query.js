import gql from 'graphql-tag';

const GET_AERIAL_VEHICLES_DATA = gql`
  query AerialVehicles {
    vehicles: getAerialVehicles {
      id
    }
  }
`;

export { GET_AERIAL_VEHICLES_DATA }; //eslint-disable-line
