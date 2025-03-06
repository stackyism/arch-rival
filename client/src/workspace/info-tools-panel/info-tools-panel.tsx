import { useSolutionStore } from "../../store.ts";
import { area } from "@turf/area";
import { union } from "@turf/union";
import { featureCollection } from "@turf/helpers";

export const InfoToolsPanel = () => {
  const { getSelectedPolygons } = useSolutionStore();
  const selectedPolygons = getSelectedPolygons();

  const unionPolygons = selectedPolygons.length > 1
    ? union(featureCollection(selectedPolygons))
    : undefined;

  const totalArea = area(
    featureCollection(unionPolygons ? [unionPolygons] : selectedPolygons),
  );

  return (
    <div>
      <div style={{ display: "flex" }}>
        <button>Intersect</button>
        <button>Union</button>
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
