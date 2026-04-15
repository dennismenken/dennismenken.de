import { createRoot } from "react-dom/client";

const container = document.getElementById("particle-root");
if (container) {
  import("./components/ParticleField")
    .then(({ default: ParticleField }) => {
      createRoot(container).render(<ParticleField />);
    })
    .catch((err) => {
      console.error("Failed to load ParticleField chunk", err);
    });
}
