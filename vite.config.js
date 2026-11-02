import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // The animations only use the SVG renderer, so the light build (no eval) is enough
    alias: [{ find: /^lottie-web$/, replacement: "lottie-web/build/player/lottie_light" }],
  },
  build: { outDir: "build" },
});
