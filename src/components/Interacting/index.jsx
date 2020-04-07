import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import LayersInteracting from '../LayersInteracting';
import PlainsInteracting from '../PlainsInteracting';

import './index.css';

const GET_ACTIVE_INTERACTING = gql`
  {
    activeInterating @client
  }
`;

const Interacting = ({ stylization }) => {
  const {
    data: { activeInterating }
  } = useQuery(GET_ACTIVE_INTERACTING);
  return (
    <div className={classNames('interacting', stylization)}>
      {activeInterating === 'layers' && <LayersInteracting stylization="" />}
      {activeInterating === 'plains' && <PlainsInteracting stylization="" />}
    </div>
  );
};

Interacting.propTypes = {
  stylization: PropTypes.string
};

Interacting.defaultProps = {
  stylization: ''
};

export default Interacting;
