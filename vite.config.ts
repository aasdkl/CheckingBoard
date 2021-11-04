import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
import WindiCSS from "vite-plugin-windicss";
import Components from "unplugin-vue-components/vite";
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/CheckingBoard/",
  server: {
    open: true,
  },
  plugins: [
    vue(),
    tsconfigPaths({ loose: true }),
    WindiCSS(),
    Icons({
      autoInstall: true,
    }),
    Components({
      resolvers: [HeadlessUiResolver(), IconsResolver()],
    }),
  ],
});
