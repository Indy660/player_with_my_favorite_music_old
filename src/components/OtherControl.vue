<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "OtherControl",
  props: {
    currentNumbSong: {
      type: Number,
      default: 0,
    },
    totalNumbSong: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<template>
  <div class="other">
    <i
      id="randomModeBtn"
      @click="$emit('randomClick')"
      class="fa-solid fa-shuffle"
    ></i>
    <div class="song-display">
      <span id="currentSongNum">{{ currentNumbSong }}</span
      >/<span id="totalSongsNum"> {{ totalNumbSong }}</span>
    </div>
  </div>
</template>

<style scoped></style>
