import type { FeatureCollection, Feature } from "@types/geojson";

export type Solutions = Record<string, FeatureCollection>;
export type Solution = FeatureCollection;
export type SelectedPolygon = Feature;