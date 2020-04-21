import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useQuery } from '@apollo/react-hooks';

import LayerDescriptor from '../LayerDecriptor';

import { GET_MAP_LAYERS } from './query';

import './index.css';

const LayersInteracting = ({ stylization }) => {
  const { data, loading, error } = useQuery(GET_MAP_LAYERS);

  if (loading || error) {
    return null;
  }

  return (
    <section className={classNames('layers-interacting', stylization)}>
      {data.mapLayers.map(({ id }) => (
        <LayerDescriptor key={id} id={id} stylization="interacting-item" />
      ))}
    </section>
  );
};

LayersInteracting.propTypes = {
  stylization: PropTypes.string
};

LayersInteracting.defaultProps = {
  stylization: ''
};

export default LayersInteracting;
