import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ImgsManifestProvider } from "./context/ImgsManifestContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ImgsManifestProvider>
      <App />
    </ImgsManifestProvider>
  </StrictMode>
);
