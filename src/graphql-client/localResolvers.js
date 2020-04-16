import { gql } from 'apollo-boost';

const resolvers = {
  MapLayer: {
    disabled: storedLayer => !!storedLayer.disabled
  },
  Mutation: {
    setLayerDisabled: (_root, { id, state: stateValue }, { cache, getCacheKey }) => {
      const storedId = getCacheKey({ __typename: 'MapLayer', id });
      cache.writeFragment({
        id: storedId,
        fragment: gql`
          fragment disabledMap on MapLayer {
            disabled
          }
        `,
        data: {
          disabled: stateValue,
          __typename: 'MapLayer'
        }
      });
      return null;
      // const { disabledLayers } = cache.readQuery({ query: GET_DISABLED_LAYERS });
      // const clearLayerState = cleared =>
      //   disabledLayers.filter(({ disabled }) => disabled !== cleared);
      // cache.writeData({
      //   data: {
      //     disabledLayers: state ? clearLayerState(id).concat(id) : clearLayerState(id)
      //   }
      // });
      // return null;
    }
  }
};

export { resolvers }; //eslint-disable-line
