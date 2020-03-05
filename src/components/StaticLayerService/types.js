import PropTypes from 'prop-types';

const ObjectType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  format: PropTypes.shape({})
});

const FormatType = PropTypes.shape({});

export default Object.freeze({
  layerScheme: {
    objects: PropTypes.shape({
      endpoint: PropTypes.string.isRequired,
      types: PropTypes.arrayOf(ObjectType),
      format: FormatType
    }).isRequired
  }
});
