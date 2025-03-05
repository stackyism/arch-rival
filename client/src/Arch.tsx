import { useState } from "react";
import { MapSurface } from "./workspace/map/map-surface.tsx";
import { Feature, FeatureCollection } from "@types/geojson";

import solution1 from "../data/solution-1.json";
import solution2 from "../data/solution-2.json";

import { Solutions } from "./types.ts";
import { getRandomFeatureId } from "./utils.ts";

const processGeoJson = (jsonObject: any): FeatureCollection => {
  return {
    ...jsonObject,
    features: jsonObject.features.map((feature: Feature) => ({
      ...feature,
      id: getRandomFeatureId(),
    })),
  };
};

export const Arch = () => {
  const [solutions, setSolutions] = useState<Solutions>({
    "solution1": processGeoJson(solution1),
    "solution2": processGeoJson(solution2),
  });
  const solutionIds = Object.keys(solutions);
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(
    solutionIds[0],
  );

  const handleIntersectPolygons = (
    solutionId: string,
    ...featureIds: string[]
  ) => {
  };
  return (
    <div style={{ display: "flex" }}>
      <div>
        {solutionIds.map((id) => (
          <div key={id} style={{ display: "flex" }}>
            <input
              id={id}
              type="radio"
              name={id}
              value={id}
              checked={selectedSolutionId === id}
              onChange={() => setSelectedSolutionId(id)}
            />
            <label htmlFor={id}>{id}</label>
          </div>
        ))}
      </div>
      <MapSurface solution={solutions[selectedSolutionId]} />
    </div>
  );
};
