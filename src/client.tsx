import { createRoot } from "react-dom/client";
import ParticleField from "./components/ParticleField";

const container = document.getElementById("particle-root");
if (container) {
  createRoot(container).render(<ParticleField />);
}
