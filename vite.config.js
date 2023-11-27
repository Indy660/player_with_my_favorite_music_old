export default {
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "music/[name].[ext]",
      },
    },
    base: "/player_with_my_favorite_music/",
  },
};
