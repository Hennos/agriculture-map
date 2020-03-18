import PropTypes from 'prop-types';

const ObjectType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  dataSourceFeature: PropTypes.string.isRequired,
  format: PropTypes.shape({})
});

export default Object.freeze({
  layerScheme: {
    dataSource: PropTypes.string.isRequired,
    objects: PropTypes.arrayOf(PropTypes.shape(ObjectType)).isRequired
  }
});
