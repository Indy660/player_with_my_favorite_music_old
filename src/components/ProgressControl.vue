<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ProgressControl",
  props: {
    // duration: {
    //   type: Number,
    //   default: 0,
    // },
    currentTime: {
      type: Number,
      default: 0,
    },
    totalTime: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    convertToValue() {
      return (this.currentTime / this.totalTime) * 100;
    },
    convertCurrentTime() {
      return this.formatTime(this.currentTime);
    },
    convertTotalTime() {
      return this.formatTime(this.totalTime);
    },
  },
  methods: {
    timeHandler(event) {
      // console.log("timeHandler", event);
      this.$emit("timeChange", event);
    },
    formatTime(timeInSeconds) {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${minutes}:${String(seconds).padStart(2, "0")}`;
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
      @input="timeHandler"
    />
    <div class="time-display">
      <span id="currentTime">{{ convertCurrentTime }}</span>
      <span id="totalTime">{{ convertTotalTime }}</span>
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
