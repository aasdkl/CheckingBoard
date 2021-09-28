import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/CheckingBoard/",
  server: {
    open: true,
  },
  plugins: [vue(), tsconfigPaths({ loose: true })],
});
