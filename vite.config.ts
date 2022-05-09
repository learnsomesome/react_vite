import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        404: resolve(__dirname, "404.html"),
      },
      output: {
        chunkFileNames: "assets/js/[name].[hash].js",
        assetFileNames: (chunkInfo) => {
          const subDir = chunkInfo.name.endsWith(".css") ? "css" : "images";

          return `assets/${subDir}/[name].[hash].[ext]`;
        },
        entryFileNames: "assets/js/[name].[hash].js",
      },
    },
  },
  plugins: [
    react(),
    svgrPlugin(),
    visualizer(),
    chunkSplitPlugin({
      strategy: "default",
      customSplitting: {
        antd_vendor: ["antd"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
