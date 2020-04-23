const origin = 'localhost';

export default Object.freeze({
  services: {
    graphql: {
      http: `http://${origin}:3001/graphql`,
      ws: `ws://${origin}:3001/graphql`
    }
  }
});
