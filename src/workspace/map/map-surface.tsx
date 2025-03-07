import Mapbox, {
  Layer,
  MapMouseEvent,
  Source,
  ViewState,
  ViewStateChangeEvent,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useState } from "react";
import { useSolutionStore } from "../../store.ts";
import { featureCollection } from "@turf/helpers";
import { baseLayer, interactiveLayerIds, selectedLayer } from "./layers.ts";
import { getCenterCooridnates } from "../../utils/getCenterCooridnates.ts";

export const MapSurface = () => {
  const {
    getSelectedSolution,
    getSelectedPolygons,
    selectPolygon,
    deselectPolygon,
  } = useSolutionStore();
  const solution = getSelectedSolution();
  const selectedPolygonsIds = solution.selectedPolygonIds;
  const selectedPolygons = getSelectedPolygons();
  const [viewState, setViewState] = useState<Partial<ViewState>>(() => {
    const [longitude, latitude] = getCenterCooridnates(solution.polygons);
    return {
      longitude,
      latitude,
      zoom: 14,
    };
  });

  const handleMapClick = useCallback((event: MapMouseEvent) => {
    if (event.features?.length) {
      const selectedPolygonId = Number(event.features[0].id);
      if (selectedPolygonsIds.includes(selectedPolygonId)) {
        deselectPolygon(selectedPolygonId);
      } else {
        selectPolygon(selectedPolygonId);
      }
    }
  }, [selectedPolygonsIds, deselectPolygon, selectPolygon]);

  const handleMapMove = useCallback(
    (event: ViewStateChangeEvent) => setViewState(event.viewState),
    [],
  );

  // keep the center of map udpated according to available polygons
  useEffect(() => {
    setViewState((prev) => {
      const [longitude, latitude] = getCenterCooridnates(solution.polygons);
      return { ...prev, longitude, latitude };
    });
  }, [solution.polygons]);

  return (
    <Mapbox
      {...viewState}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={handleMapMove}
      interactiveLayerIds={interactiveLayerIds}
      onClick={handleMapClick}
    >
      <Source
        id="solution-polygons"
        type="geojson"
        data={featureCollection(solution.polygons)}
      >
        <Layer {...baseLayer} />
      </Source>
      <Source
        id="selected-polygons"
        type="geojson"
        data={featureCollection(selectedPolygons)}
      >
        <Layer {...selectedLayer} />
      </Source>
    </Mapbox>
  );
};
