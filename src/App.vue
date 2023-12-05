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
// const TRACK_LIST = Object.keys(import.meta.glob("./assets/music/*.mp3"));
// const TRACK_LIST = Object.keys(import.meta.glob("./assets/music/*.mp3")).map(
//   (path) => {
//     const slicedPath = path.replace("./assets/music/", "");
//     return import.meta.env.DEV
//       ? `./src/assets/music/${slicedPath}`
//       : `${import.meta.env.BASE_URL}assets/music/${slicedPath}`;
//   },
// );
// TODO: разобраться!!!!
const TRACK_LIST = Object.keys(import.meta.glob("./assets/music/*.mp3")).map(
  (path) => {
    const slicedPath = path.replace("./assets/music/", "");
    return import.meta.env.DEV
      ? `./src/assets/music/${slicedPath}`
      : `.${import.meta.env.BASE_URL}assets/${slicedPath}`;
  },
);
const TRACK_LIST3 = Object.keys(import.meta.glob("./assets/music/*.mp3")).map(
  (path) => {
    const slicedPath = path.replace("./assets/music/", "");
    return import.meta.env.DEV
      ? `./src/assets/music/${slicedPath}`
      : `./assets/${slicedPath}`;
  },
);
console.log("TRACK_LIST", TRACK_LIST);
console.log("TRACK_LIST3", TRACK_LIST3);
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
      totalNumbSongs: 0,

      isPlaying: false,
      currentTime: 0,
      totalTime: 0,

      isRandomTracks: false,
      // TODO: мб потом сделать единое хранилище
      // currentVolume: 0.8,
      // currentRange: 0,
    };
  },
  computed: {
    pathToCurrentFile() {
      return this.currentTracks[this.currentTrackIndex];
    },
    fullSongName() {
      const indexLastSlash = this.pathToCurrentFile.lastIndexOf("/");
      const dotIndex = this.pathToCurrentFile.lastIndexOf(".");
      return this.pathToCurrentFile.substring(indexLastSlash + 1, dotIndex);
    },
    currentTracks() {
      if (this.isRandomTracks) {
        return this.getRandomTracks();
      }
      return TRACK_LIST;
    },
  },
  created() {
    this.pathToCurrentFile = TRACK_LIST[0];
    this.totalNumbSongs = TRACK_LIST.length;
    const TRACK_LIST2 = Object.keys(
      import.meta.glob("./assets/music/*.mp3"),
    ).map((path) => {
      const slicedPath = path.replace("./assets/music/", "");
      return import.meta.env.DEV
        ? `./src/assets/music/${slicedPath}`
        : `.${import.meta.env.BASE_URL}assets/${slicedPath}`;
    });
    console.log("TRACK_LIST2", TRACK_LIST2);
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
      // console.log("handlerTimeChange", event.target.value);
      // console.dir(audioPlayer.value);
      audioPlayer.value.currentTime =
        (event.target.value / 100) * audioPlayer.value.duration;
    },
    onTimeUpdate(event) {
      this.currentTime = event.target.currentTime;
    },
    setVolume(value) {
      // // :TODO: поправить
      if ("volume" in audioPlayer.value) {
        audioPlayer.value.volume = value / 100;
      }
    },
    setTotalTime(event) {
      // console.log("setTotalTime", event, event.target, event.target?.duration);
      this.totalTime = event.target.duration;
    },
    playTrack() {
      if (this.isPlaying) {
        try {
          audioPlayer.value?.play().then((r) => r);
        } catch (error) {}
      }
    },
    togglePlayPause() {
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
      // console.log("nextTrack");
      this.currentTrackIndex += 1;
      if (this.currentTrackIndex >= TRACK_LIST.length) {
        this.currentTrackIndex = 0;
      }
    },
    previousTrack() {
      // console.log("previousTrack");
      this.currentTrackIndex =
        (this.currentTrackIndex - 1 + TRACK_LIST.length) % TRACK_LIST.length;
    },
    handlerRandomBtn() {
      this.isRandomTracks = !this.isRandomTracks;
    },
    getRandomTracks() {
      return TRACK_LIST.map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    },
  },
});
</script>

<template>
  <div class="container">
    <MainInfoBand :full-song-name="fullSongName" />
    <VolumeControl @volumeChange="setVolume" />
    <ProgressControl
      :current-time="currentTime"
      :total-time="totalTime"
      @timeChange="handlerTimeChange"
    />
    <MainControl
      @previous="previousTrack"
      @next="nextTrack"
      @playPause="togglePlayPause"
      :is-playing="isPlaying"
    />
    <OtherControl
      :current-numb-song="currentTrackIndex + 1"
      :total-numb-song="totalNumbSongs"
      @randomClick="handlerRandomBtn"
    />
    <!--      src="./music/Angel Vivaldi - A Martian Winter.mp3"-->
    <!--      :src="pathToCurrentFile"-->
    <audio
      :src="pathToCurrentFile"
      ref="audioPlayer"
      preload="metadata"
      id="audioPlayer"
      @timeupdate="onTimeUpdate"
      @canplay="handlerCanPlay"
    />
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
