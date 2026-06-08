import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const publicBase = env.VITE_PUBLIC_BASE || "/ui/";
  const backendUrl = env.VITE_DEV_BACKEND_URL || "http://127.0.0.1:8000";

  return {
    base: publicBase,
    build: {
      outDir: "dist",
      emptyOutDir: true,
      assetsDir: "assets",
      rollupOptions: {
        input: {
          main: resolve(rootDir, "index.html"),
          perturbation: resolve(rootDir, "perturbation.html")
        }
      }
    },
    server: {
      proxy: {
        "/api": {
          target: backendUrl,
          changeOrigin: true
        },
        "/bsApi": {
          target: backendUrl,
          changeOrigin: true
        }
      }
    },
    plugins: [adminRoutePlugin()]
  };
});

function adminRoutePlugin() {
  return {
    name: "idg-admin-route",
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        if (request.url?.startsWith("/admin/perturbation")) {
          request.url = "/perturbation.html";
        }
        next();
      });
    }
  };
}
