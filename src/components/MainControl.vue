<script setup lang="ts"></script>

<template>
  <div class="main-control">
    <button id="previousBtn" class="player-button">
      <i class="fas fa-step-backward"></i>
    </button>
    <button id="playPauseBtn" class="player-button">
      <i class="fas fa-play"></i>
    </button>
    <button id="nextBtn" class="player-button">
      <i class="fas fa-step-forward"></i>
    </button>
  </div>
</template>

<style scoped>
.main-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.player-button {
  font-size: 24px;
  border-radius: 50%;
  background-color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.player-button i {
  color: #333;
}

.player-button.playing i {
  display: none;
}

.player-button.playing:after {
  content: "\f04c";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #333;
}

.player-button.playing:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.player-button:hover {
  background-color: #ddd;
}
</style>
