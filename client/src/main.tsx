import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Arch } from "./Arch.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Arch />
  </StrictMode>,
);
