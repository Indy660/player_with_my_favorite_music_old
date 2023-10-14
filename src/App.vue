<script lang="ts">
import { defineComponent, ref } from "vue";
import MainControl from "./components/MainControl.vue";
import VolumeControl from "./components/VolumeControl.vue";
import OtherControl from "./components/OtherControl.vue";
import ProgressControl from "./components/ProgressControl.vue";
import MainInfoBand from "./components/MainInfoBand.vue";

const audioPlayer = ref<HTMLAudioElement | null>(null);
export default defineComponent({
  components: {
    MainControl,
    VolumeControl,
    OtherControl,
    ProgressControl,
    MainInfoBand,
  },
  data() {
    return {
      // audioPlayer: {},
      currentTrackIndex: 0,
      isPlaying: false,
      trackList: [],
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
    audioPlayer.value = this.$refs.audioPlayer as HTMLAudioElement;
  },
  methods: {
    onTimeUpdate(event) {
      this.updateCurrentTime(event);
      this.updateProgress(event);
    },
    updateCurrentTime(event) {
      console.log("updateCurrentTime", event);
      // currentTimeElement.textContent = this.formatTime(event.currentTime);
    },
    updateProgress(event) {
      console.log("updateProgress", event);
    },
    setVolume(event) {
      console.log("setVolume", event);
      if ("volume" in audioPlayer.value) {
        audioPlayer.value.volume = event.value / 100;
      }
    },
    formatTime(timeInSeconds) {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${minutes}:${String(seconds).padStart(2, "0")}`;
    },
    seekAudio(event) {
      console.log("seekAudio", event);
    },
    setTotalTime(event) {
      console.log("setTotalTime", event);
    },

    loadTrack(track: string) {
      if ("src" in audioPlayer.value) {
        audioPlayer.value.src = track;
      }
      // this.setLogo(track);
      // this.setInfoBand(track);
    },

    playTrack(track: string) {
      console.log("playTrack", track);
      this.loadTrack(track);
      // TODO: для дебагинга на всякий
      console.dir(audioPlayer.value);

      // this.currentSongNum.textContent = (currentTrackIndex + 1).toString();
      if (this.isPlaying) {
        audioPlayer.value?.play().then((r) => r);
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
      // this.playTrack(this.trackList.getTracks()[this.currentTrackIndex]);
    },

    previousTrack() {
      console.log("previousTrack");
      this.currentTrackIndex =
        (this.currentTrackIndex - 1 + this.trackList.length) %
        this.trackList.length;
      // this.playTrack(this.tracks.getTracks()[this.currentTrackIndex]);
    },

    onTracksUpdate(nextTracks: string[]) {
      audioPlayer.value?.pause();
      if ("currentTime" in audioPlayer.value) {
        audioPlayer.value.currentTime = 0;
      }

      // const tracks =  getMusicList();
      this.currentTrackIndex = 0;
      this.isPlaying = false;

      this.loadTrack(nextTracks[0]);
    },
  },
});
</script>

<template>
  <div class="container">
    <MainInfoBand :full-song-name="fullSongName" />
    <!--      :volume="audioPlayer.value"-->
    <VolumeControl @volumeChange="setVolume" />
    <ProgressControl />
    <MainControl
      @previous="previousTrack"
      @next="nextTrack"
      @playPause="togglePlayPause"
      :is-play="isPlaying"
    />
    <OtherControl :current-numb-song="0" :total-numb-song="0" />
    <!--      src="./music/Angel Vivaldi - A Martian Winter.mp3"-->
    <audio
      :src="pathToCurrentFile"
      ref="audioPlayer"
      preload="metadata"
      id="audioPlayer"
      @timeupdate="onTimeUpdate"
      @input="seekAudio"
      @canplay="setTotalTime"
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
