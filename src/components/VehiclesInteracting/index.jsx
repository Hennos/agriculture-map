import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useQuery } from '@apollo/react-hooks';

import VehicleDescriptor from '../VehicleDescriptor';

import { GET_AERIAL_VEHICLES_DATA } from './query';

import './index.css';

const VehiclesInteracting = ({ stylization }) => {
  const { data, loading, error } = useQuery(GET_AERIAL_VEHICLES_DATA);

  if (loading || error) return null;

  const { vehicles } = data;
  return (
    <div className={classNames('vehicles-interacting', stylization)}>
      {vehicles.map(({ id }) => (
        <VehicleDescriptor key={id} id={id} stylization="vehicles-interacting-element" />
      ))}
    </div>
  );
};

VehiclesInteracting.propTypes = {
  stylization: PropTypes.string
};

VehiclesInteracting.defaultProps = {
  stylization: ''
};

export default VehiclesInteracting;
