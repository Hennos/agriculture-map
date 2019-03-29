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

class DebugTileLayer extends GridLayer {
  createLeafletElement() {
    return new L.GridLayer.Debug();
  }
}

export default withLeaflet(DebugTileLayer);
