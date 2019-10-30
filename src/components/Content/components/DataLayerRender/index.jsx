import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { head, tail } from 'lodash';

import { getLayersDataByName } from '../../../../store/mapLayers/requests';

import CompositeLayer from '../CompositeLayer';

function DataLayerRender({ layer }) {
  // const [store, updateStore] = useState({
  //   data: {},
  //   queue: loadingOrder
  // });

  // function loadLayersData(layers) {
  //   return new Promise(resolve => {
  //     fetch(getLayersDataByName(layers))
  //       .then(response => {
  //         response.json().then(loadedData => {
  //           resolve(loadedData);
  //         });
  //       })
  //       .catch(err => {
  //         throw err;
  //       });
  //   });
  // }

  // useEffect(() => {
  //   const { data: layersData, queue: loadingQueue } = store;
  //   if (loadingQueue.length !== 0) {
  //     loadLayersData(head(loadingQueue)).then(loadedData => {
  //       updateStore({
  //         data: {
  //           ...layersData,
  //           ...Object.fromEntries(loadedData.map(layerData => [layerData.name, layerData]))
  //         },
  //         queue: tail(loadingQueue)
  //       });
  //     });
  //   }
  // }, [store]);

  return <CompositeLayer name={layer} />;
}

DataLayerRender.propTypes = {
  layer: PropTypes.string.isRequired
};

export default DataLayerRender;
