import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as process from "process";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:
    process.env.NODE_ENV === "production"
      ? "/player_with_my_favorite_music/"
      : "/",
});
