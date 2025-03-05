import { create } from "zustand";

type SelectedFeatureStore = {
  selectedFeatures: number[];
  addSelectedFeature: (featureId: number) => void;
  removeSelectedFeature: (featureId: number) => void;
};

export const useSelectedFeatures = create<SelectedFeatureStore>((set) => ({
  selectedFeatures: [],
  addSelectedFeature: (featureId: number) => {
    set((state) => ({
      selectedFeatures: [...state.selectedFeatures, featureId],
    }));
  },
  removeSelectedFeature: (featureId: number) => {
    set((state) => ({
      selectedFeatures: state.selectedFeatures.filter(
        (id) => id !== featureId,
      ),
    }));
  },
}));
