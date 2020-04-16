import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NavItem from '../NavItem';

import './index.css';

const Navigation = ({ stylization }) => (
  <nav className={classNames('navingation', stylization)}>
    <ul className="nav-list">
      <li className="nav-list-item">
        <NavItem name="layers" stylization="nav-item-button" icon="fas fa-layer-group" />
      </li>
      <li className="nav-list-item">
        <NavItem name="vehicles" stylization="nav-item-button" icon="fas fa-plane" />
      </li>
    </ul>
  </nav>
);

Navigation.propTypes = {
  stylization: PropTypes.string
};

Navigation.defaultProps = {
  stylization: ''
};

export default Navigation;
