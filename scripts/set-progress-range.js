import {audioPlayer} from "../consts.js";

const progressRange = document.getElementById('progressRange');
// let isSeeking = false;

audioPlayer.addEventListener('timeupdate', updateProgress);
progressRange.addEventListener('input', seekAudio);
// progressRange.addEventListener('mousedown', () => (isSeeking = true));
// progressRange.addEventListener('mouseup', () => (isSeeking = false));

function updateProgress() {
  // if (!isSeeking) {
    progressRange.value =  (audioPlayer.currentTime / audioPlayer.duration) * 100;
  // }
}

function seekAudio() {
  audioPlayer.currentTime = (progressRange.value / 100) * audioPlayer.duration;
}
