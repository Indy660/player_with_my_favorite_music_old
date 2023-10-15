<script lang="ts">
import { defineComponent, ref } from "vue";
import MainInfoBand from "./components/MainInfoBand.vue";
import VolumeControl from "./components/VolumeControl.vue";
import ProgressControl from "./components/ProgressControl.vue";
import MainControl from "./components/MainControl.vue";
import OtherControl from "./components/OtherControl.vue";

interface CustomAudioElement extends HTMLAudioElement {
  currentRange: number;
  duration: number;
  volume: number;
}

const audioPlayer = ref<HTMLAudioElement | null>(null);
export default defineComponent({
  components: {
    MainInfoBand,
    VolumeControl,
    ProgressControl,
    MainControl,
    OtherControl,
  },
  data() {
    return {
      currentTrackIndex: 0,
      isPlaying: false,
      trackList: [],
      currentTime: 0,
      totalTime: 0,
      currentVolume: 0.8,
      currentRange: 0,

      // loaded: false,

      // currentPlaybackRate: 1,
      // savedVolume: 0,
      // showSettings: false,
      // isPlaying: false,
    };
  },
  computed: {
    pathToCurrentFile() {
      return this.trackList[this.currentTrackIndex];
    },
    fullSongName() {
      const indexLastSlash = this.pathToCurrentFile?.lastIndexOf("/");
      return this.pathToCurrentFile
        ?.substring(indexLastSlash + 1)
        .slice(0, this.fullSongName?.lastIndexOf("."));
    },
  },
  created() {
    this.trackList = Object.keys(import.meta.glob("./music/*.mp3"));
    this.pathToCurrentFile = this.trackList[0];
  },
  mounted() {
    audioPlayer.value = this.$refs.audioPlayer as CustomAudioElement;
  },
  methods: {
    handlerCanPlay(event) {
      this.setTotalTime(event);
      this.playTrack();
    },
    handlerTimeChange(event) {
      if (audioPlayer.value) {
        this.currentRange =
          (audioPlayer.value.currentRange / audioPlayer.value.duration) * 100;
      }
    },
    onTimeUpdate(event) {
      this.updateCurrentTime(event);
      this.updateProgress(event);
    },
    updateCurrentTime(event) {
      console.dir("updateCurrentTime", event);

      // currentTimeElement.textContent = this.formatTime(event.currentTime);
    },
    updateProgress(event) {
      console.log("updateProgress", event);
    },
    setVolume(event) {
      console.log("setVolume", event);
      // :TODO: поправить
      if ("volume" in audioPlayer.value) {
        audioPlayer.value.volume = event.value / 100;
      }
    },
    seekAudio(event) {
      console.log("seekAudio", event);
      audioPlayer.value.currentTime =
        (progressRange.value / 100) * audioPlayer.duration;
    },
    setTotalTime(event) {
      console.log("setTotalTime", event);
    },
    playTrack() {
      if (this.isPlaying) {
        try {
          audioPlayer.value?.play().then((r) => r);
        } catch (error) {}
      }
    },

    togglePlayPause() {
      console.dir(
        audioPlayer,
        audioPlayer.value,
        // audioPlayer.play().then((r) => r),
      );
      console.log("togglePlayPause", audioPlayer.value);
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        // this.playPauseBtn.classList.add("playing");
        audioPlayer.value?.play().then((r) => r);
      } else {
        // this.playPauseBtn.classList.remove("playing");
        audioPlayer.value?.pause();
      }
    },

    nextTrack() {
      console.log("nextTrack");
      this.currentTrackIndex += 1;
      if (this.currentTrackIndex >= this.trackList.length) {
        this.currentTrackIndex = 0;
      }
    },

    previousTrack() {
      console.log("previousTrack");
      this.currentTrackIndex =
        (this.currentTrackIndex - 1 + this.trackList.length) %
        this.trackList.length;
    },
  },
});
</script>

<template>
  <div class="container">
    <MainInfoBand :full-song-name="fullSongName" />
    <!--      :volume="audioPlayer.value"-->
    <VolumeControl @volumeChange="setVolume" />
    <ProgressControl @timeChange="handlerTimeChange" />
    <MainControl
      @previous="previousTrack"
      @next="nextTrack"
      @playPause="togglePlayPause"
      :is-playing="isPlaying"
    />
    <OtherControl :current-numb-song="0" :total-numb-song="0" />
    <!--      src="./music/Angel Vivaldi - A Martian Winter.mp3"-->
    <!--      :src="pathToCurrentFile"-->
    <audio
      :src="`src/${pathToCurrentFile}`"
      ref="audioPlayer"
      preload="metadata"
      id="audioPlayer"
      @timeupdate="onTimeUpdate"
      @input="seekAudio"
      @canplay="handlerCanPlay"
    />
    <!--      audioPlayer.addEventListener("timeupdate", updateProgress);-->
    <!--      progressRange.addEventListener("input", seekAudio);-->
    <!--      audioPlayer.addEventListener("timeupdate", updateCurrentTime);-->
    <!--      audioPlayer.addEventListener("canplay", setTotalTime);-->
  </div>
</template>

<style lang="css">
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
</style>
