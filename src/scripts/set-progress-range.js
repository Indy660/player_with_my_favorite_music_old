import { audioPlayer, progressRange } from "../consts";

function updateProgress() {
  progressRange.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
}

function seekAudio() {
  audioPlayer.currentTime = (progressRange.value / 100) * audioPlayer.duration;
}

audioPlayer.addEventListener("timeupdate", updateProgress);
progressRange.addEventListener("input", seekAudio);
