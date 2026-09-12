import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/projects/vetart/",
  server: {
    proxy: {
      "/projects/vetart/api": {
        target: "http://localhost:3003",
        rewrite: (path) => path.replace(/^\/projects\/vetart/, ""),
      },
    },
  },
});
