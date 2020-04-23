import ApolloClient from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';

import { resolvers } from './localResolvers';

import settings from '../settings';

const cache = new InMemoryCache();

const initialData = {
  activeInterating: null,
  activeEditing: null
};

cache.writeData({ data: initialData });

const apiPath = settings.services.graphql;
const httpLink = new HttpLink({
  uri: apiPath.http
});
const wsLink = new WebSocketLink({
  uri: apiPath.ws,
  options: {
    reconnect: true
  }
});
const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(
        ({ message, locations, path }) =>
          console.error(`[GraphQL error]: Message: ${message}, Path: ${path}`) //eslint-disable-line
      );
    if (networkError) console.error(`[Network error]: ${networkError}`); //eslint-disable-line
  }),
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
  )
]);

const client = new ApolloClient({
  link,
  cache,
  resolvers
});

client.onResetStore(() => cache.writeData({ data: initialData }));

export default client;
