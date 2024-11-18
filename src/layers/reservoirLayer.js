import algarveReservoirs from '../../data/algarveReservoirs.json';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import Color from '@arcgis/core/Color';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import FieldsContent from '@arcgis/core/popup/content/FieldsContent';
import FieldInfo from '@arcgis/core/popup/FieldInfo';

function reservoirLayer() {
  const blob = new Blob([JSON.stringify(algarveReservoirs)], {
    type: "application/json"
  });

  const name = new FieldInfo({
    fieldName: "name",
    label: "Name",
    visible: true
  });

  const opened_date = new FieldInfo({
    fieldName: "opened_date",
    label: "Opened date",
    visible: true
  });

  const total_capacity = new FieldInfo({
    fieldName: "total_capacity",
    label: "Total capacity",
    visible: true
  });

  const useful_capacity = new FieldInfo({
    fieldName: "useful_capacity",
    label: "Useful capacity",
    visible: true
  });

  const wikipedia_article = new FieldInfo({
    fieldName: "wikipedia_article",
    label: "Wikipedia article",
    visible: true
  });

  const snirh_page = new FieldInfo({
    fieldName: "snirh_page",
    label: "SNIRH page",
    visible: true
  });

  const fieldsElement = new FieldsContent({
    fieldInfos: [name, opened_date, total_capacity, useful_capacity, wikipedia_article, snirh_page]
  });

  const reservoirPopup = new PopupTemplate({
    title: "Reservoir",
    content: [ fieldsElement ]
  });

  return new GeoJSONLayer({
    url: URL.createObjectURL(blob),
    renderer: new SimpleRenderer({
      symbol: new SimpleFillSymbol({
        color: new Color([0, 0, 255, 0.5]),
        outline: new SimpleLineSymbol({
          width: 0
        })
      })
    }),
    popupEnabled: true,
    popupTemplate: reservoirPopup
  });
}

export default reservoirLayer;
