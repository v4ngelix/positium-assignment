import algarveReservoirs from '../../data/algarveReservoirs.json';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import Color from '@arcgis/core/Color';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';

function reservoirLayer() {
  const blob = new Blob([JSON.stringify(algarveReservoirs)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);

  const lineSymbol = new SimpleLineSymbol({
    color: new Color([0, 0, 255, 0.8]), // Blue with 80% opacity
    width: 2 // Line width in pixels
  });

  const fillSymbol = new SimpleFillSymbol({
    color: new Color([0, 255, 0, 0.5]), // Green with 50% opacity
    outline: lineSymbol // Use the line symbol for the polygon's border
  });

  return new GeoJSONLayer({
    url,
    renderer: new SimpleRenderer({
      symbol: fillSymbol
    })
  });
}

export default reservoirLayer;
