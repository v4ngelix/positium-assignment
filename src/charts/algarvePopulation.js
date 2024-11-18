import Graphic from '@arcgis/core/Graphic';
import Feature from '@arcgis/core/widgets/Feature';
import ChartMediaInfoValue from '@arcgis/core/popup/content/support/ChartMediaInfoValue';
import LineChartMediaInfo from '@arcgis/core/popup/content/LineChartMediaInfo';
import MediaContent from '@arcgis/core/popup/content/MediaContent';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import algarveAnnualPopulation from '../../data/algarveAnnualPopulation.tsv?raw';
import { tsvParse } from 'd3-dsv';

function algarvePopulation() {

  const populationData = tsvParse(algarveAnnualPopulation);
  const fields = populationData.columns;
  let attributes = {};
  Object.entries(populationData[0]).forEach(e => {
    attributes[e[0]] = parseInt(e[1]);
  });

  const lineChartValue = new ChartMediaInfoValue({
    colors: [[220, 123, 4, 1]],
    fields: fields,
  });

  const lineChart = new LineChartMediaInfo({
    title: "<b>Algarve population</b>",
    caption: "Annual",
    value: lineChartValue,
  });

  const mediaElement = new MediaContent({
    mediaInfos: [ lineChart ]
  });

  const template = new PopupTemplate({
    content: [ mediaElement ]
  });

  const graphic = new Graphic({
    popupTemplate: template,
    attributes: attributes,
  });

  return new Feature({
    graphic: graphic,
  });
}

export default algarvePopulation;