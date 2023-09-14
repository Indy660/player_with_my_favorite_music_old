import { audioPlayer } from "../consts";

const currentTimeElement = document.getElementById("currentTime");
const totalTimeElement = document.getElementById("totalTime");

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
function updateCurrentTime() {
  currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
}

function setTotalTime() {
  totalTimeElement.textContent = formatTime(audioPlayer.duration);
}

audioPlayer.addEventListener("timeupdate", updateCurrentTime);
audioPlayer.addEventListener("canplay", setTotalTime);
