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
import algarvePopulation from './charts/algarvePopulation.js';

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
        zoom: 11,
        constraints: {
          maxZoom: 12,
          rotationEnabled: false,
          geometry: getExtentFromFeature(algarveBoundary),
        },
      });

      map.add(districtBoundaryLayer());
      map.add(reservoirLayer());

      const timeSlider = new TimeSlider({
        container: "timeSliderDiv",
        viewModel: {
          view: view,
          mode: "instant",
          fullTimeExtent: {
            start: new Date(1991, 0, 1),
            end: new Date(2024, 0, 1)
          },
          stops: {
            interval: {
              value: 1,
              unit: "months"
            }
          }
        }
      });

      view.ui.add(timeSlider, "bottom-left");
      view.ui.add(algarvePopulation(), "manual");
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
