import { gql } from 'apollo-boost';

const GET_AERIAL_VEHICLE = gql`
  query GetVehicleDescription($id: ID!) {
    vehicle: getAerialVehicle(id: $id) {
      tasks {
        taskId: id
        taskName: name
        steps {
          stepId: id
          stopTime
          stepPos: coordinates {
            lng
            lat
          }
        }
      }
    }
  }
`;

export { GET_AERIAL_VEHICLE }; //eslint-disable-line
