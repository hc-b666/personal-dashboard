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
    port: 5173,
    strictPort: true,
  },
  server: {
    port: 5173,
    host: true,
    origin: "http://0.0.0.0:5173",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          reactMarkdown: ["react-markdown"],
          remarkGfm: ["remark-gfm"],
          rehypeRaw: ["rehype-raw"],
          syntaxHighlighter: ["react-syntax-highlighter"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
