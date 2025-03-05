import Mapbox, {
  Layer,
  LayerSpecification,
  MapMouseEvent,
  MapRef,
  Source,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { Solution } from "../../types.ts";
import { useSelectedPolygons } from "../../store.ts";

const layerStyle: LayerSpecification = {
  id: "solution1",
  source: "solution-1.json",
  type: "fill",
  paint: {
    "fill-color": "lightblue",
    "fill-opacity": 0.6,
    "fill-outline-color": "black",
  },
};

const layerStyle2: LayerSpecification = {
  id: "selectedPolygons",
  source: "solution-1.json",
  type: "fill",
  paint: {
    "fill-color": "lightyellow",
    "fill-opacity": 0.6,
    "fill-outline-color": "black",
  },
};

export const MapSurface = ({ solution }: { solution: Solution }) => {
  const [mapRef, setMapRef] = useState<MapRef | null>();
  const [longitude, latitude] = solution.type === "FeatureCollection" &&
      solution.features[0].geometry.type === "Polygon"
    ? solution.features[0].geometry.coordinates[0][0]
    : [0, 0];
  const [viewState, setViewState] = useState(
    {
      longitude,
      latitude,
      zoom: 14,
    },
  );
  const { selectedPolygons, selectPolygon, deselectPolygon } =
    useSelectedPolygons();

  console.log("wow selectedPolygons", selectedPolygons);

  useEffect(() => {
    const map = mapRef?.getMap();
  }, [mapRef]);
  return (
    <Mapbox
      // https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      style={{ width: 700, height: 700 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      ref={setMapRef}
      // onLoad={() => setLoaded(true)}
      onMove={(e: any) => setViewState(e.viewState)}
      interactiveLayerIds={["solution1"]}
      {...viewState}
      onClick={(event: MapMouseEvent) => {
        if (event.features?.length) {
          const selectedFeatureId = event.features[0].id;
          const clickedPolygon = solution.features.find((feature) =>
            feature.id === selectedFeatureId
          );
          if (clickedPolygon) {
            if (
              selectedPolygons.find((polygon) =>
                polygon.id === clickedPolygon.id
              )
            ) {
              deselectPolygon(clickedPolygon);
            } else {
              selectPolygon(clickedPolygon);
            }
          }
        }
      }}
    >
      <Source id="solution1" type="geojson" data={solution}>
        <Layer {...layerStyle} />
      </Source>
      <Source
        id="selectedPolygons"
        type="geojson"
        data={{ type: "FeatureCollection", features: selectedPolygons }}
      >
        <Layer {...layerStyle2} />
      </Source>
    </Mapbox>
  );
};
