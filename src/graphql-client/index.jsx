import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './client';

const StateProvider = ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>;

StateProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default StateProvider;
