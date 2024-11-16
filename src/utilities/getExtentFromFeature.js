import Extent from '@arcgis/core/geometry/Extent';

/** An utility method for creating Extent from an Feature */
function getExtentFromFeature(feature) {
  const coords = feature.geometry.coordinates[0];
  const xCoords = coords.map(coord => coord[0]);
  const yCoords = coords.map(coord => coord[1]);

  const xmin = Math.min(...xCoords);
  const ymin = Math.min(...yCoords);
  const xmax = Math.max(...xCoords);
  const ymax = Math.max(...yCoords);

  console.log({
    xmin,
    ymin,
    xmax,
    ymax,
  });

  return new Extent({
    xmin,
    ymin,
    xmax,
    ymax,
  });
}

export default getExtentFromFeature;