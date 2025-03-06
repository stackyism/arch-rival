import Mapbox, {
  Layer,
  LayerSpecification,
  MapMouseEvent,
  MapRef,
  Source,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { useSolutionStore } from "../../store.ts";
import { featureCollection } from "@turf/helpers";

const layerStyle: LayerSpecification = {
  id: "solution-polygons",
  source: "solution-1.json",
  type: "fill",
  paint: {
    "fill-color": "lightblue",
    "fill-opacity": 0.6,
    "fill-outline-color": "black",
  },
};

const layerStyle2: LayerSpecification = {
  id: "selected-polygons",
  source: "solution-1.json",
  type: "fill",
  paint: {
    "fill-color": "lightyellow",
    "fill-opacity": 0.6,
    "fill-outline-color": "black",
  },
};

export const MapSurface = () => {
  const [mapRef, setMapRef] = useState<MapRef | null>();
  const {
    getSelectedSolution,
    getSelectedPolygons,
    selectPolygon,
    deselectPolygon,
  } = useSolutionStore();
  const solution = getSelectedSolution();
  const selectedPolygonsIds = solution.selectedPolygonIds;
  const selectedPolygons = getSelectedPolygons();
  const [longitude, latitude] = solution.polygons[0].geometry.type === "Polygon"
    ? solution.polygons[0].geometry.coordinates[0][0]
    : [0, 0];
  const [viewState, setViewState] = useState(
    {
      longitude,
      latitude,
      zoom: 14,
    },
  );

  useEffect(() => {
    const map = mapRef?.getMap();
  }, [mapRef]);
  return (
    <Mapbox
      {...viewState}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      style={{ width: 700, height: 700 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      ref={setMapRef}
      onMove={(e: any) => setViewState(e.viewState)}
      interactiveLayerIds={["solution-polygons"]}
      onClick={(event: MapMouseEvent) => {
        if (event.features?.length) {
          const selectedPolygonId = Number(event.features[0].id);
          if (selectedPolygonsIds.includes(selectedPolygonId)) {
            deselectPolygon(selectedPolygonId);
          } else {
            selectPolygon(selectedPolygonId);
          }
        }
      }}
    >
      <Source
        id="solution-polygons"
        type="geojson"
        data={featureCollection(solution.polygons)}
      >
        <Layer {...layerStyle} />
      </Source>
      <Source
        id="selected-polygons"
        type="geojson"
        data={featureCollection(selectedPolygons)}
      >
        <Layer {...layerStyle2} />
      </Source>
    </Mapbox>
  );
};
