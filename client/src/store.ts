import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  PolygonId,
  Solution,
  SolutionId,
  SolutionJson,
  SolutionPolygon,
  SolutionsMap,
} from "./types.ts";
import { adaptGeoJsonToSolution } from "./utils/adaptGeoJsonToSolution.ts";
import { uuid } from "./utils/uuid.ts";

import solution1 from "../data/solution-1.json";
import solution2 from "../data/solution-2.json";

type SolutionsStore = {
  solutions: SolutionsMap;
  selectedSolutionId: SolutionId;
  selectPolygon: (polygonId: PolygonId) => void;
  deselectPolygon: (polygonId: PolygonId) => void;
  selectSolution: (solutionId: SolutionId) => void;
  replacePolygons: (newPolygon: SolutionPolygon) => void;
  getSelectedSolution: () => Solution;
  getSelectedPolygons: () => Solution["polygons"];
};
const initialSolutionId = uuid();

export const useSolutionStore = create<SolutionsStore>()(devtools(
  subscribeWithSelector(immer((set, get) => ({
    solutions: Object.fromEntries([
      [
        initialSolutionId,
        adaptGeoJsonToSolution(solution1 as SolutionJson, "Solution 1"),
      ],
      [uuid(), adaptGeoJsonToSolution(solution2 as SolutionJson, "Solution 2")],
    ]),
    selectedSolutionId: initialSolutionId,
    selectPolygon: (polygonId: PolygonId) => {
      set((state) => {
        state.solutions[state.selectedSolutionId].selectedPolygonIds = [
          ...state.solutions[state.selectedSolutionId].selectedPolygonIds,
          polygonId,
        ];
      });
    },
    deselectPolygon: (polygonId: PolygonId) => {
      set((state) => {
        state.solutions[state.selectedSolutionId].selectedPolygonIds = state
          .solutions[
            state.selectedSolutionId
          ].selectedPolygonIds.filter((id) => id !== polygonId);
      });
    },
    replacePolygons: (newPolygon: SolutionPolygon) => {
      set((state) => {
        const selectedSolution = state.getSelectedSolution();
        const selectedPolygonIds = selectedSolution.selectedPolygonIds;
        const updatedPolygons = selectedSolution.polygons.filter((polygon) =>
          !selectedPolygonIds.includes(polygon.id)
        );
        updatedPolygons.push(newPolygon);
        state.solutions[state.selectedSolutionId].polygons = updatedPolygons;
        state.solutions[state.selectedSolutionId].selectedPolygonIds = [];
      });
    },
    selectSolution: (solutionId: SolutionId) => {
      set((state) => {
        state.selectedSolutionId = solutionId;
      });
    },
    getSelectedSolution: () => {
      const state = get();
      return state.solutions[state.selectedSolutionId];
    },
    getSelectedPolygons: () => {
      const state = get();
      const selectedSolution = state.getSelectedSolution();
      return selectedSolution.polygons.filter((polygon) =>
        selectedSolution.selectedPolygonIds.includes(polygon.id)
      );
    },
  }))),
));
