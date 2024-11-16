import algarveBoundary from '../../data/algarveBoundary.json';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';

function districtBoundaryLayer() {
  const blob = new Blob([JSON.stringify(algarveBoundary)], {
    type: "application/json"
  });

  return new GeoJSONLayer({
    url: URL.createObjectURL(blob),
    renderer: new SimpleRenderer({
      symbol: new SimpleLineSymbol({
        color: 'red',
        width: 2,
        style: 'long-dash-dot-dot'
      }),
    })
  });
}

export default districtBoundaryLayer;
