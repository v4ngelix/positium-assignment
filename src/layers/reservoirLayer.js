import algarveReservoirs from '../../data/algarveReservoirs.json';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import Color from '@arcgis/core/Color';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import PopupTemplate from '@arcgis/core/PopupTemplate.js';

function reservoirLayer() {
  const blob = new Blob([JSON.stringify(algarveReservoirs)], {
    type: "application/json"
  });

  const lineSymbol = new SimpleLineSymbol({
    width: 0
  });

  const fillSymbol = new SimpleFillSymbol({
    color: new Color([0, 255, 0, 0.5]), // Green with 50% opacity
    outline: lineSymbol
  });

  const reservoirPopup = new PopupTemplate({
    title: "Reservoir",
    content: "Name: {Name}"
  });

  return new GeoJSONLayer({
    url: URL.createObjectURL(blob),
    renderer: new SimpleRenderer({
      symbol: fillSymbol
    }),
    popupEnabled: true,
    popupTemplate: reservoirPopup
  });
}

export default reservoirLayer;
