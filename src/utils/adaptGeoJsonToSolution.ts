import { Solution, SolutionJson } from "../types.ts";
import { generateRandomPolygonId } from "./generateRandomPolygonId.ts";

export const adaptGeoJsonToSolution = (
  jsonObject: SolutionJson,
  name: string,
): Solution => ({
  name,
  polygons: jsonObject.features.map((feature) => ({
    ...feature,
    id: generateRandomPolygonId(),
  })),
  selectedPolygonIds: [],
});
