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
  id: "layer2",
  source: "solution1",
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

  useEffect(() => {
    const map = mapRef?.getMap();
  }, [mapRef]);
  return (
    <Mapbox
      // https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens
      mapboxAccessToken=""
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      ref={setMapRef}
      // onLoad={() => setLoaded(true)}
      onMove={(e: any) => setViewState(e.viewState)}
      interactiveLayerIds={["solution1"]}
      {...viewState}
      onClick={(event: MapMouseEvent) => {
        console.log("wow features", event.features);
      }}
    >
      <Source id="solution1" type="geojson" data={solution}>
        <Layer {...layerStyle} />
        <Layer {...layerStyle2} />
      </Source>
    </Mapbox>
  );
};
