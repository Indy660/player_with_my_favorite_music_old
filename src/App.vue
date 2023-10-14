<script setup lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";
import MainInfoBand from "./components/MainInfoBand.vue";
import MainControl from "./components/MainControl.vue";
import OtherControl from "./components/OtherControl.vue";
import ProgressControl from "./components/ProgressControl.vue";
import VolumeControl from "./components/VolumeControl.vue";
</script>

<template>
  <div class="container">
    <MainInfoBand :full-song-name="fullSongName" />
    <!--    <img-->
    <!--      id="logoImage"-->
    <!--      src="../src/assets/default_logo.png"-->
    <!--      class="album-image"-->
    <!--      alt=""-->
    <!--    />-->
    <!--    <div class="artist-info">-->
    <!--      <div id="bandName" class="band"></div>-->
    <!--      <div id="songName" class="song"></div>-->
    <!--    </div>-->
    <VolumeControl @volumeChange="setVolume" :volume="audioPlayer.value" />
    <!--    <div class="volume-control">-->
    <!--      <button id="volumeDownBtn" class="player-button">-->
    <!--        <i class="fas fa-volume-up"></i>-->
    <!--      </button>-->
    <!--      <input-->
    <!--        class="volume-control"-->
    <!--        type="range"-->
    <!--        id="volumeRange"-->
    <!--        min="0"-->
    <!--        max="100"-->
    <!--        value="80"-->
    <!--        step="1"-->
    <!--      />-->
    <!--    </div>-->
    <ProgressControl />
    <!--    <div class="progress-control">-->
    <!--      <input-->
    <!--        type="range"-->
    <!--        id="progressRange"-->
    <!--        min="0"-->
    <!--        max="100"-->
    <!--        value="0"-->
    <!--        step="1"-->
    <!--      />-->
    <!--      <div class="time-display">-->
    <!--        <span id="currentTime">0:00</span>-->
    <!--        <span id="totalTime">0:00</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <MainControl @previous="" @next="" @playPause="" :is-play="false" />
    <!--    <div class="main-control">-->
    <!--      <button id="previousBtn" class="player-button">-->
    <!--        <i class="fas fa-step-backward"></i>-->
    <!--      </button>-->
    <!--      <button id="playPauseBtn" class="player-button">-->
    <!--        <i class="fas fa-play"></i>-->
    <!--      </button>-->
    <!--      <button id="nextBtn" class="player-button">-->
    <!--        <i class="fas fa-step-forward"></i>-->
    <!--      </button>-->
    <!--    </div>-->
    <OtherControl />
    <!--    <div class="other">-->
    <!--      <i id="randomModeBtn" class="fa-solid fa-shuffle"></i>-->
    <!--      <div class="song-display">-->
    <!--        <span id="currentSongNum">1</span>/<span id="totalSongsNum"></span>-->
    <!--      </div>-->
    <!--    </div>-->
    <audio
      v-model="audioPlayer"
      preload="metadata"
      id="audioPlayer"
      @timeupdate="onTimeUpdate"
      @input="seekAudio"
      @canplay="setTotalTime"
    ></audio>

    <!--      audioPlayer.addEventListener("timeupdate", updateProgress);-->
    <!--      progressRange.addEventListener("input", seekAudio);-->
    <!--      audioPlayer.addEventListener("timeupdate", updateCurrentTime);-->
    <!--      audioPlayer.addEventListener("canplay", setTotalTime);-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      audioPlayer: {},
      pathToFile: "",
    };
  },
  computed: {
    fullSongName() {
      const indexLastSlash = this.pathToFile.lastIndexOf("/");
      return this.pathToFile
        .substring(indexLastSlash + 1)
        .slice(0, this.fullSongName.lastIndexOf("."));
    },
  },
  methods: {
    onTimeUpdate(event) {
      this.updateCurrentTime(event);
      this.updateProgress(event);
    },
    updateCurrentTime(event) {
      currentTimeElement.textContent = this.formatTime(event.currentTime);
    },
    updateProgress(event) {},
    setVolume(event) {
      console.log("setVolume", event);
      this.audioPlayer.volume = event.value / 100;
    },
    formatTime(timeInSeconds) {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${minutes}:${String(seconds).padStart(2, "0")}`;
    },
    seekAudio() {},
    setTotalTime() {},
  },
});
</script>

<style>
body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    background-color: #f7f7f7;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: content-box;
}

.container {
    width: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 400px) {
    .container {
        width: 100vw;
        padding: 3vw;
    }
}

.container > * {
    margin-bottom: 10px;
}

input[type="range"] {
    width: 100%;
    height: 5px;
    background-color: #ddd;
    border-radius: 2px;
    outline: none;
}
input[type="range"]::-webkit-slider-thumb {
    width: 12px;
    height: 12px;
    background-color: #666;
    border-radius: 50%;
    cursor: pointer;
}

/*.logo {*/
/*  height: 6em;*/
/*  padding: 1.5em;*/
/*  will-change: filter;*/
/*  transition: filter 300ms;*/
/*}*/
/*.logo:hover {*/
/*  filter: drop-shadow(0 0 2em #646cffaa);*/
/*}*/
/*.logo.vue:hover {*/
/*  filter: drop-shadow(0 0 2em #42b883aa);*/
//}
</style>
