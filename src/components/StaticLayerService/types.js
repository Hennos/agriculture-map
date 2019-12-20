import PropTypes from 'prop-types';

export default Object.freeze({
  layerScheme: {
    objects: PropTypes.shape({
      endpoint: PropTypes.string.isRequired,
      types: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          format: PropTypes.shape({}).isRequired
        })
      ).isRequired
    }).isRequired
  }
});
