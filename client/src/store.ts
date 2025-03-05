import { create } from "zustand";
import { SelectedPolygon } from "./types.ts";

type SelectedPolygonsStore = {
  selectedPolygons: SelectedPolygon[];
  selectPolygon: (polygon: SelectedPolygon) => void;
  deselectPolygon: (polygon: SelectedPolygon) => void;
  removeAllSelectedPolygons: () => void;
};

export const useSelectedPolygons = create<SelectedPolygonsStore>((set) => ({
  selectedPolygons: [],
  selectPolygon: (polygon: SelectedPolygon) => {
    set((state) => ({
      selectedPolygons: [...state.selectedPolygons, polygon],
    }));
  },
  deselectPolygon: (polygon: SelectedPolygon) => {
    set((state) => ({
      selectedPolygons: state.selectedPolygons.filter(
        (selectedPolygon) => selectedPolygon.id !== polygon.id,
      ),
    }));
  },
  removeAllSelectedPolygons: () => {
    set(() => ({
      selectedPolygons: [],
    }));
  },
}));
