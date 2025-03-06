import { MapSurface } from "./workspace/map/map-surface.tsx";
import { InfoToolsPanel } from "./workspace/info-tools-panel/info-tools-panel.tsx";
import { SolutionsPanel } from "./workspace/solutions-panel/solutions-panel.tsx";

export const Arch = () => {
  return (
    <div style={{ display: "flex" }}>
      <SolutionsPanel />
      <MapSurface />
      <InfoToolsPanel />
    </div>
  );
};
