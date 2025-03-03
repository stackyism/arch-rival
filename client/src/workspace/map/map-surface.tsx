import Mapbox, {
  Layer,
  LayerSpecification,
  MapRef,
  Source,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import solution1 from "../../../data/solution-1.json";

const layerStyle: LayerSpecification = {
  id: "solution1",
  source: "solution-1.json",
  type: "fill",
  paint: {
    "fill-color": "gray",
    "fill-opacity": 0.6,
    "fill-outline-color": "black",
  },
};

export const MapSurface = () => {
  const [mapRef, setMapRef] = useState<MapRef>();
  const [viewState, setViewState] = useState(
    {
      longitude: 2.2919046878814697,
      latitude: 48.85770582708133,
      zoom: 12,
    },
  );

  useEffect(() => {
    const map = mapRef?.getMap();
  }, [mapRef]);
  return (
    <Mapbox
      // https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens
      mapboxAccessToken=""
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      ref={setMapRef}
      // onLoad={() => setLoaded(true)}
      onMove={(e: any) => setViewState(e.viewState)}
      interactiveLayerIds={["solution1"]}
      {...viewState}
      onClick={(event: any) => {
        console.log("wow features", event.features);
      }}
    >
      <Source id="solution1" type="geojson" data={solution1}>
        <Layer {...layerStyle} />
      </Source>
    </Mapbox>
  );
};
