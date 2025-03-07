import type { Feature, FeatureCollection, Polygon } from "@types/geojson";

export type PolygonId = number;
export type SolutionId = string;
export type SolutionPolygon = Feature<Polygon> & { id: number };
export type Solution = {
  name: string;
  polygons: SolutionPolygon[];
  selectedPolygonIds: PolygonId[];
};

export type SolutionJson = FeatureCollection<Polygon>;

export type SolutionsMap = Record<SolutionId, Solution>;

export type SelectedPolygon = SolutionPolygon;
