import { useCallback } from "react";
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

  const handleIntersectPolygons = useCallback(() => {
    const intersectedPolygon = intersect(featureCollection(selectedPolygons));
    if (intersectedPolygon) {
      replacePolygons({ ...intersectedPolygon, id: generateRandomPolygonId() });
    }
  }, [selectedPolygons, replacePolygons]);

  const handleUnionPolygons = useCallback(() => {
    if (unionedPolygon) {
      replacePolygons(
        {
          ...unionedPolygon,
          id: generateRandomPolygonId(),
        },
      );
    }
  }, [unionedPolygon, replacePolygons]);

  const areActionsDisabled = selectedPolygons.length < 2;

  return (
    <div>
      <p>Please select at least 2 polygons to activate actions</p>
      <div className="flex gap-1">
        <button
          type="button"
          className="outline"
          aria-label="Intersect selected polygons"
          disabled={areActionsDisabled}
          onClick={handleIntersectPolygons}
          data-tooltip="This will create a new polygon with the intersection of the selected polygons"
        >
          Intersect
        </button>
        <button
          type="button"
          className="outline"
          aria-label="Union selected polygons"
          disabled={areActionsDisabled}
          onClick={handleUnionPolygons}
          data-tooltip="This will create a new polygon with the union of the selected polygons"
        >
          Union
        </button>
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
