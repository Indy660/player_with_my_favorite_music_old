export default {
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "music/[name].[ext]",
      },
    },
    base:
      process.env.NODE_ENV === "production"
        ? "/player_with_my_favorite_music/"
        : "/",
  },
};
