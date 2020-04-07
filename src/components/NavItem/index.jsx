import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Button from '../Button';

import './index.css';

const GET_ACTIVE_INTERACTING = gql`
  {
    activeInterating @client
  }
`;

const NavItem = ({ name, stylization, icon }) => {
  const { data, client } = useQuery(GET_ACTIVE_INTERACTING);
  const onChoose = useCallback(() => client.writeData({ data: { activeInterating: name } }), [
    name,
    client
  ]);
  return (
    <Button
      stylization={classNames(
        'nav-item',
        data.activeInterating === name && 'nav-item-choosed',
        stylization
      )}
      onClick={onChoose}
    >
      <i className={icon} />
    </Button>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  stylization: PropTypes.string,
  icon: PropTypes.string
};

NavItem.defaultProps = {
  stylization: '',
  icon: ''
};

export default NavItem;
