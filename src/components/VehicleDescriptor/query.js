import gql from 'graphql-tag';

const vehicleDataFragment = gql`
  fragment VehicleData on AerialVehicle {
    telemetry {
      battery
      lastActivity
    }
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
`;

const GET_AERIAL_VEHICLE = gql`
  query GetVehicleDescription($id: ID!) {
    vehicle: getAerialVehicle(id: $id) {
      ...VehicleData
    }
  }
  ${vehicleDataFragment}
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
      ...VehicleData
    }
  }
  ${vehicleDataFragment}
`;

export { GET_AERIAL_VEHICLE, CANCEL_VEHICLE_TASK, AERIAL_VEHICLE_SUBSCRIPTION }; //eslint-disable-line
