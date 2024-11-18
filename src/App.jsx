import React, {useRef, useEffect } from 'react';
import "./App.css";

// Arcgis
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import TimeSlider from '@arcgis/core/widgets/TimeSlider';

// Utilities
import getExtentFromFeature from './utilities/getExtentFromFeature.js';
import { center } from '@turf/center';
import { getCoord } from '@turf/invariant';

// Data
import algarveBoundary from '../data/algarveBoundary.json';

// Layers
import districtBoundaryLayer from './layers/districtBoundaryLayer.js';
import reservoirLayer from './layers/reservoirLayer.js';

function App() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const currentMapContainer = mapContainer.current;
    if (currentMapContainer) {
      const map = new Map({
        basemap: "topo-vector",
      });

      const view = new MapView({
        container: currentMapContainer,
        map,
        center: getCoord(center(algarveBoundary)),
        constraints: {
          minZoom: 11,
          maxZoom: 12,
          rotationEnabled: false,
          geometry: getExtentFromFeature(algarveBoundary),
        },
      });

      map.add(districtBoundaryLayer());
      map.add(reservoirLayer());

      const bookmarks = new Bookmarks({
        view
      });

      const bkExpand = new Expand({
        view,
        content: bookmarks,
        expanded: false
      });

      // Add the widget to the top-right corner of the view
      view.ui.add(bkExpand, "top-right");

      const timeSlider = new TimeSlider({
        container: "timeSliderDiv",

        viewModel: {
          view: view,
          mode: "instant",
          fullTimeExtent: {
            start: new Date(2000, 0, 1),
            end: new Date(2010, 0, 1)
          },
          timeExtent: {
            start: new Date(2000, 0, 1),
            end: new Date(2000, 0, 1)
          }
        }
      });
      view.ui.add(timeSlider, "bottom-left");
    }
  }, [ mapContainer ]);

    return (
      <div
        className="pa__map-container"
        ref={ mapContainer }
      />
    );
  }

export default App;
