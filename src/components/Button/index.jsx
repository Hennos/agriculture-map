import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.css';

const Button = ({ stylization, onClick, children }) => (
  <button className={classNames('custom-button', stylization)} type="button" onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  stylization: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};

Button.defaultProps = {
  stylization: '',
  onClick: () => {},
  children: ''
};

export default Button;
