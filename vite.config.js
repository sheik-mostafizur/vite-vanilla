import {defineConfig} from "vite";
import path from "path";

export default defineConfig({
  // Set the root to the 'src' directory
  root: path.resolve(__dirname, "src"),

  // Configure the build output
  build: {
    outDir: path.resolve(__dirname, "dist"), // Outputs files to the dist directory in the project root
    emptyOutDir: true, // Optionally clears the directory each build
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"), // Entry file
      },
    },
  },

  // Configure the server to serve files from the public directory
  server: {
    open: "/index.html", // Opens index.html on server start
    watch: {
      usePolling: true, // This can help in some environments where default watching is unreliable
    },
    force: true, // Forces reloading between saves
  },

  // If you use assets in the public directory, make sure they are copied over
  publicDir: path.resolve(__dirname, "public"),
});
