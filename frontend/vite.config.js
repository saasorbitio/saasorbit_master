import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/postcss";

export default defineConfig({
  // When deploying the frontend under a sub-path (e.g. https://saasorbit.io/vendor/)
  // set the base to that path so built asset URLs become /vendor/assets/...
  base: "/vendor/",
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  server: {
    middlewareMode: false,
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
