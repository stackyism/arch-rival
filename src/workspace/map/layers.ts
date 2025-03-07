import { LayerSpecification } from "react-map-gl/mapbox";

export const baseLayer: LayerSpecification = {
  id: "solution-polygons",
  source: "solution-1.json",
  type: "fill",
  paint: {
    "fill-color": "lightblue",
    "fill-opacity": 0.6,
    "fill-outline-color": "black",
  },
};

export const selectedLayer: LayerSpecification = {
  id: "selected-polygons",
  source: "solution-1.json",
  type: "fill",
  paint: {
    "fill-color": "lightyellow",
    "fill-opacity": 0.6,
    "fill-outline-color": "black",
  },
};

export const interactiveLayerIds = ["solution-polygons"];
