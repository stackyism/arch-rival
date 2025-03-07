import { MapSurface } from "./workspace/map/map-surface.tsx";
import { InfoToolsPanel } from "./workspace/info-tools-panel/info-tools-panel.tsx";
import { SolutionsPanel } from "./workspace/solutions-panel/solutions-panel.tsx";

export const ArchitectSolutionsManager = () => {
  return (
    <>
      <header>
        <h2>Architect Solutions Manager</h2>
      </header>

      <main className="flex gap-1">
        <article className="flex-1">
          <SolutionsPanel />
        </article>
        <article className="map-surface">
          <MapSurface />
        </article>
        <article className="flex-1">
          <InfoToolsPanel />
        </article>
      </main>
    </>
  );
};
