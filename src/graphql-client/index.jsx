import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/react-hooks';

import createClient from './createClient';

const StateProvider = ({ apiURL, children }) => (
  <ApolloProvider client={createClient({ uri: apiURL })}>{children}</ApolloProvider>
);

StateProvider.propTypes = {
  apiURL: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default StateProvider;
