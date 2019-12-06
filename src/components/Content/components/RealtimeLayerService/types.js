import PropTypes from 'prop-types';

export default Object.freeze({
  options: {
    delay: PropTypes.number,
    layer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }
});
