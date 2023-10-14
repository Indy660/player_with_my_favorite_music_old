<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MainInfoBand",
  props: {
    volume: {
      type: Number,
      default: 80,
    },
  },
  computed: {
    convertToValue() {
      return this.volume * 100;
    },
  },
  methods: {
    volumeHandler(event) {
      console.log("volumeHandler", event);
      this.$emit("volumeChange", event);
      // audioPlayer.volume = volumeRange.value / 100;
    },
  },
});
</script>

<template>
  <div class="volume-control">
    <button id="volumeDownBtn" class="player-button">
      <i class="fas fa-volume-up"></i>
    </button>
    <input
      class="volume-control"
      type="range"
      :value="convertToValue"
      id="volumeRange"
      min="0"
      max="100"
      value="80"
      step="1"
      @change="volumeHandler"
    />
  </div>
</template>

<style scoped>
.volume-control {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
