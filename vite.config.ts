import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist/client",
    manifest: true,
    rollupOptions: {
      input: {
        client: "src/client.tsx",
        styles: "src/styles/index.css",
      },
    },
  },
});
