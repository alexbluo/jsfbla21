import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";

/**
 * Formats the dependencies for code-splitting
 * @param { Object<string, string> } deps the list of dependencies from package.json
 * @returns { Object<string, Array<string>> } the list of code chunks to be split
 */
const renderChunks = (deps) => {
  const chunks = {};

  Object.keys(deps).forEach((key) => {
    // ignore react dependencies, which are already included in vendor
    if (["react", "react-router-dom", "react-dom"].includes(key)) return;
    // otherwise add the dependency to the chunks object
    chunks[key] = [key];
  });

  return chunks;
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        changeOrigin: true,
      },
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-router-dom", "react-dom"],
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
