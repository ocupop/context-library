import icon from "astro-icon";
import { defineConfig } from "astro/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cssWatcher } from "../../packages/shared/plugins/css-watcher.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  vite: {
    css: {
      devSourcemap: true,
    },
    resolve: {
      alias: {
        "@skele/components": path.resolve(__dirname, "../../packages/shared/components"),
        "@skele/styles": path.resolve(__dirname, "../../packages/shared/styles"),
        "@skele/plugins": path.resolve(__dirname, "../../packages/shared/plugins"),
      },
    },
    plugins: [cssWatcher()],
  },
  integrations: [
    icon({
      iconDir: path.resolve(__dirname, "../icons"),
    }),
  ],
});
