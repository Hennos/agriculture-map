import PropTypes from 'prop-types';

export default Object.freeze({
  scheme: {
    options: PropTypes.object.isRequired,
    services: PropTypes.array.isRequired,
    childLayers: PropTypes.array.isRequired,
    objects: PropTypes.object.isRequired
  }
});
