import PropTypes from 'prop-types';

export default Object.freeze({
  socket: {
    on: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired
  },
  options: {
    request: PropTypes.string.isRequired,
    response: PropTypes.string.isRequired,
    layer: PropTypes.string.isRequired,
    repeat: PropTypes.bool,
    delay: PropTypes.number
  }
});
