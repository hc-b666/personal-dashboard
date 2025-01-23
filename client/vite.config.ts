import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: 5050,
    strictPort: true,
  },
  server: {
    port: 5050,
    host: true,
    origin: "http://0.0.0.0:5050",
  },
});

