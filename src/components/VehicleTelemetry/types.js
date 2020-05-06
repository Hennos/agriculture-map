import PropTypes from 'prop-types';

export default Object.freeze({
  telemetry: {
    battery: PropTypes.number.isRequired,
    lastActivity: PropTypes.string.isRequired
  }
});
