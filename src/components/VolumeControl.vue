<script setup lang="ts"></script>

<template>
  <div class="volume-control">
    <button id="volumeDownBtn" class="player-button">
      <i class="fas fa-volume-up"></i>
    </button>
    <input
      class="volume-control"
      type="range"
      id="volumeRange"
      min="0"
      max="100"
      value="80"
      step="1"
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
