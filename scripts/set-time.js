import {audioPlayer} from "../consts.js";

const currentTimeElement = document.getElementById('currentTime');
const totalTimeElement = document.getElementById('totalTime');

audioPlayer.addEventListener('timeupdate', updateCurrentTime);
audioPlayer.addEventListener('canplay', setTotalTime);

function updateCurrentTime() {
  currentTimeElement.textContent = formatTime(audioPlayer.currentTime);

}

function setTotalTime() {
  totalTimeElement.textContent = formatTime(audioPlayer.duration);
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
