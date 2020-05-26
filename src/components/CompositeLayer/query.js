import gql from 'graphql-tag';

const GET_COMPOSITE_MAP_LAYER = gql`
  query CompositeMapLayer($id: ID!) {
    layerOptions: getMapLayer(id: $id) {
      disabled @client
    }
    unfoldedCompositeLayer: unfoldMapLayerSchemes(id: $id) {
      id
    }
    activeEditing @client
  }
`;

export { GET_COMPOSITE_MAP_LAYER }; //eslint-disable-line
