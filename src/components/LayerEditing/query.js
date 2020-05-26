import gql from 'graphql-tag';

const GET_EDITING_LAYER = gql`
  query GetEditingLayer {
    activeEditing @client
  }
`;

export { GET_EDITING_LAYER }; //eslint-disable-line
