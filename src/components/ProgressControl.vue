<script setup lang="ts"></script>

<template>
  <div class="progress-control">
    <input
      type="range"
      id="progressRange"
      min="0"
      max="100"
      value="0"
      step="1"
    />
    <div class="time-display">
      <span id="currentTime">0:00</span>
      <span id="totalTime">0:00</span>
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
