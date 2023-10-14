<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ProgressControl",
  props: {
    volume: {
      type: Number,
      default: 80,
    },
    currentTime: {
      type: String,
      default: "0:00",
    },
    totalTime: {
      type: String,
      default: "0:00",
    },
  },
  computed: {
    convertToValue() {
      return this.volume * 100;
    },
  },
  methods: {
    timeHandler(event) {
      console.log("timeHandler", event);
      this.$emit("timeChange", event);
      // audioPlayer.volume = volumeRange.value / 100;
    },
  },
});
</script>

<template>
  <div class="progress-control">
    <input
      type="range"
      id="progressRange"
      min="0"
      max="100"
      :value="convertToValue"
      step="1"
      @change="timeHandler"
    />
    <div class="time-display">
      <span id="currentTime">{{ currentTime }}</span>
      <span id="totalTime">{{ totalTime }}</span>
    </div>
  </div>
</template>

<style scoped>
.progress-control {
  width: 100%;
}
.time-display {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #333;
}
</style>
