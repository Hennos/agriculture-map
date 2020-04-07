import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { resolvers } from './localResolvers';

export default function({ uri }) {
  const cache = new InMemoryCache();

  const initialData = {
    activeInterating: null,
    activeEditing: null
  };

  cache.writeData({ data: initialData });

  const client = new ApolloClient({
    uri,
    cache,
    resolvers
  });

  client.onResetStore(() => cache.writeData({ data: initialData }));

  return client;
}
