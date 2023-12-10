import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

// https://vitejs.dev/config/;
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  base:
    process.env.NODE_ENV === "production"
      ? "/player_with_my_favorite_music/"
      : "/",
  build: {
    manifest: true, // включает генерацию манифеста с хэшами файлов
  },
});
