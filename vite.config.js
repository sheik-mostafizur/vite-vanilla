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
      output: {
        manualChunks: () => "all-in-one",
        entryFileNames: `assets/index-[hash].js`,
        assetFileNames: (assetInfo) => {
          const assetType = getAssetType(assetInfo.name);
          switch (assetType) {
            case "css":
              return "assets/styles-[hash][extname]";
            case "js":
              return "assets/[name]-[hash][extname]";
            case "image":
              return "assets/images/[name]-[hash][extname]";
            case "font":
              return "assets/fonts/[name]-[hash][extname]";
            default:
              return "assets/other/[name]-[hash][extname]";
          }
        },
      },
    },
  },

  // Configure the server to serve files from the public directory
  server: {
    port: 8080,
    hot: true,
  },

  // If you use assets in the public directory, make sure they are copied over
  publicDir: path.resolve(__dirname, "public"),
});

function getAssetType(fileName) {
  const extension = fileName.slice(fileName.lastIndexOf("."));
  switch (extension) {
    case ".css":
      return "css";
    case ".png":
    case ".jpg":
    case ".jpeg":
    case ".gif":
    case ".svg":
    case ".webp":
    case ".avif":
      return "image";
    case ".woff":
    case ".woff2":
    case ".ttf":
    case ".eot":
      return "font";
    default:
      return "other";
  }
}
