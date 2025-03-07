import { useSolutionStore } from "../../store.ts";
import { area } from "@turf/area";
import { union } from "@turf/union";
import { intersect } from "@turf/intersect";
import { featureCollection } from "@turf/helpers";
import { generateRandomPolygonId } from "../../utils/generateRandomPolygonId.ts";
import { Polygon } from "@types/geojson";

export const InfoToolsPanel = () => {
  const { getSelectedPolygons, replacePolygons } = useSolutionStore();
  const selectedPolygons = getSelectedPolygons();

  const unionedPolygon = selectedPolygons.length > 1
    ? union(featureCollection<Polygon>(selectedPolygons))
    : undefined;

  const totalArea = area(
    featureCollection(unionedPolygon ? [unionedPolygon] : selectedPolygons),
  );

  const handleIntersectPolygons = () => {
    const intersectedPolygon = intersect(featureCollection(selectedPolygons));
    if (intersectedPolygon) {
      replacePolygons({ ...intersectedPolygon, id: generateRandomPolygonId() });
    }
  };

  const handleUnionPolygons = () => {
    if (unionedPolygon) {
      replacePolygons(
        {
          ...unionedPolygon,
          id: generateRandomPolygonId(),
        },
      );
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <button onClick={handleIntersectPolygons}>Intersect</button>
        <button onClick={handleUnionPolygons}>Union</button>
      </div>
      {totalArea
        ? (
          <div>
            Total area: {(totalArea / 1000).toFixed(2)} sq m²
          </div>
        )
        : null}
    </div>
  );
};
