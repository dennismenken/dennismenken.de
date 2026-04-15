import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist/client",
    manifest: true,
    rolldownOptions: {
      input: {
        client: "src/client.tsx",
        styles: "src/styles/index.css",
      },
      output: {
        codeSplitting: {
          groups: [
            { name: "three-vendor", test: /[\\/]node_modules[\\/]three[\\/]/ },
            { name: "r3f-vendor", test: /[\\/]node_modules[\\/]@react-three[\\/]/ },
          ],
        },
      },
    },
  },
});
