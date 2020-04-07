import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Button from '../Button';

import { GET_LAYER_DESCRIPTOR, SET_LAYER_DISABLED } from './query';

import './index.css';

const LayerDescriptor = ({ id, stylization }) => {
  const { data, loading, error, client } = useQuery(GET_LAYER_DESCRIPTOR, { variables: { id } });
  const [setLayerDisabled] = useMutation(SET_LAYER_DISABLED);

  if (loading || error) return null;

  const {
    descriptor: { name: layerName, disabled: layerDisabled },
    activeEditing
  } = data;

  const isEditing = activeEditing === id;

  return (
    <div className={classNames('layer-descriptor', stylization)}>
      <p className="descriptor-title">{layerName}</p>
      <Button
        stylization="descriptor-button"
        onClick={() => setLayerDisabled({ variables: { id, state: !layerDisabled } })}
      >
        <i className={layerDisabled ? 'fas fa-eye-slash' : 'far fa-eye'} />
      </Button>
      <Button
        stylization="descriptor-button"
        onClick={() =>
          client.writeData({
            data: {
              activeEditing: isEditing ? null : id
            }
          })
        }
      >
        <i className={isEditing ? 'fas fa-edit' : 'far fa-edit'} />
      </Button>
    </div>
  );
};

LayerDescriptor.propTypes = {
  id: PropTypes.string.isRequired,
  stylization: PropTypes.string
};

LayerDescriptor.defaultProps = {
  stylization: ''
};

export default LayerDescriptor;
