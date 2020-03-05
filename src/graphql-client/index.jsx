import React from 'react';
import PropTypes from 'prop-types';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const createClient = ({ uri }) =>
  new ApolloClient({
    uri
  });

const StateProvider = ({ apiURL, children }) => (
  <ApolloProvider client={createClient({ uri: apiURL })}>{children}</ApolloProvider>
);

StateProvider.propTypes = {
  apiURL: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default StateProvider;
