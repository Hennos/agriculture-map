import PropTypes from 'prop-types';

const ObjectType = PropTypes.shape({
  dataSourceFeature: PropTypes.string.isRequired,
  format: PropTypes.shape({})
});

export default {
  layerScheme: {
    id: PropTypes.string,
    dataSource: PropTypes.string,
    objectsTypes: PropTypes.arrayOf(ObjectType)
  }
};
