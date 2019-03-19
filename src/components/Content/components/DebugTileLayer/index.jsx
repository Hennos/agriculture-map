import React from 'react';
import L from 'leaflet';
import { GridLayer, withLeaflet } from 'react-leaflet';

L.GridLayer.Debug = L.GridLayer.extend({
  createTile: coords => {
    const tile = document.createElement('div');
    tile.innerHTML = [coords.x, coords.y].join(', ');
    tile.style.outline = '1px solid red';
    return tile;
  }
});

L.gridLayer.debug = () => {
  return new L.GridLayer.Debug();
};

class DebugTileLayer extends GridLayer {
  componentDidMount() {
    super.componentDidMount();
  }

  createLeafletElement() {
    return new L.gridLayer.debug();
  }
}

export default withLeaflet(DebugTileLayer);
