import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.css';

const Button = ({ name, stylization, onClick, children }) => {
  return (
    <button className={classNames('custom-button', stylization)} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  stylization: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};

Button.defaultProps = {
  name: '',
  stylization: '',
  onClick: () => {},
  children: ''
};

export default Button;
