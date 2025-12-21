import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import { resolve } from "path";
import { defineConfig, Plugin } from "vite";

// Plugin to handle 404.html for GitHub Pages compatibility during preview
function githubPages404Plugin(): Plugin {
  return {
    name: "github-pages-404",
    configurePreviewServer(server) {
      // Add middleware to catch 404s and serve 404.html
      server.middlewares.use((req, res, next) => {
        // Only handle GET requests
        if (req.method !== "GET") {
          return next();
        }

        const url = req.url || "/";

        // Skip root, index.html, and static assets (files with extensions)
        if (url === "/" || url === "/index.html" || /\.\w+$/.test(url)) {
          return next();
        }

        // Check if the requested path exists as a file or directory with index.html in dist
        const distDir = resolve(__dirname, "dist");
        const urlPath = url.slice(1); // Remove leading slash
        const filePath = resolve(distDir, urlPath);

        // First check if it's a directory with index.html (like weekend/index.html)
        const indexPath = resolve(filePath, "index.html");
        if (fs.existsSync(indexPath)) {
          // Directory has index.html, let Vite serve it
          return next();
        }

        // Check if it's a file
        fs.stat(filePath, (err, stats) => {
          if (err) {
            // Path doesn't exist - serve 404.html (mimicking GitHub Pages)
            const notFoundPath = resolve(distDir, "404.html");
            if (fs.existsSync(notFoundPath)) {
              const notFoundHtml = fs.readFileSync(notFoundPath, "utf-8");
              res.statusCode = 404;
              res.setHeader("Content-Type", "text/html");
              res.end(notFoundHtml);
            } else {
              next();
            }
          } else if (stats.isFile()) {
            // It's a file - let Vite serve it
            next();
          } else {
            // It's a directory but no index.html - serve 404.html
            const notFoundPath = resolve(distDir, "404.html");
            if (fs.existsSync(notFoundPath)) {
              const notFoundHtml = fs.readFileSync(notFoundPath, "utf-8");
              res.statusCode = 404;
              res.setHeader("Content-Type", "text/html");
              res.end(notFoundHtml);
            } else {
              next();
            }
          }
        });
      });
    },
  };
}

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
    plugins: [react(), githubPages404Plugin()],
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
