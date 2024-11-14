import React, { useRef, useEffect } from "react";
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";

import "./App.css";

function App() {

  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: "topo-vector",
      });

      const view = new MapView({
        container: mapDiv.current,
        map,
        center: [ -8.693767657634714, 37.17917842122225 ],
        zoom: 10,
        constraints: {
          minZoom: 10,
          maxZoom: 12,
        }
      });

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
    }
  }, [mapDiv]);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
