import gql from 'graphql-tag';

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

const CANCEL_VEHICLE_TASK = gql`
  mutation CancelVehicleTask($vehicle: ID!, $task: ID!) {
    cancelVehicleTask(vehicle: $vehicle, task: $task) {
      id
    }
  }
`;

const AERIAL_VEHICLE_SUBSCRIPTION = gql`
  subscription onVehicleUpdated($id: ID!) {
    updatedVehicle(id: $id) {
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

export { GET_AERIAL_VEHICLE, CANCEL_VEHICLE_TASK, AERIAL_VEHICLE_SUBSCRIPTION }; //eslint-disable-line
