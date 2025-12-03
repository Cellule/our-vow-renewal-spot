import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Use SSR config for server builds
  if (command === "build" && mode === "ssr") {
    return {
      plugins: [react()],
      resolve: {
        alias: {
          "@": resolve(__dirname, "./src"),
        },
      },
      build: {
        ssr: true,
        outDir: "dist/server",
        rollupOptions: {
          input: "src/entry-server.tsx",
          output: {
            format: "esm",
            entryFileNames: "[name].js",
          },
        },
      },
      ssr: {
        noExternal: ["react-router-dom"],
      },
    };
  }

  // Default config for client builds
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
      },
    },
    ssr: {
      noExternal: ["react-router-dom"],
    },
  };
});
