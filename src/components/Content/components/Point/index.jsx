import React from 'react';
import { CircleMarker } from 'react-leaflet';

export default class Point extends CircleMarker {
  updateLeafletElement(fromProps, toProps) {
    super.updateLeafletElement(fromProps, toProps);
    this.leafletElement.bringToFront();
  }
}
