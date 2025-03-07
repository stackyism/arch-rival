import { Solution } from "../types.ts";
import { center } from "@turf/center";
import { featureCollection } from "@turf/helpers";

export const getCenterCooridnates = (
  polygons: Solution["polygons"],
): [number, number] => {
  const centeredPolygon = center(featureCollection(polygons));
  return centeredPolygon.geometry.coordinates;
};
