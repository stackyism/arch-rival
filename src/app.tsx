import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ArchitectSolutionsManager } from "./architect-solutions-manager.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ArchitectSolutionsManager />
  </StrictMode>,
);
