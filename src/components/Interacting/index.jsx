import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import LayersInteracting from '../LayersInteracting';
import VehiclesInteracting from '../VehiclesInteracting';

const GET_ACTIVE_INTERACTING = gql`
  {
    activeInterating @client
  }
`;

const Interacting = ({ stylization }) => {
  const { data } = useQuery(GET_ACTIVE_INTERACTING);
  switch (data.activeInterating) {
    case 'layers':
      return <LayersInteracting stylization={classNames('modal-window-theme', stylization)} />;
    case 'vehicles':
      return <VehiclesInteracting stylization={classNames('modal-window-theme', stylization)} />;
    default:
      return null;
  }
};

Interacting.propTypes = {
  stylization: PropTypes.string
};

Interacting.defaultProps = {
  stylization: ''
};

export default Interacting;
