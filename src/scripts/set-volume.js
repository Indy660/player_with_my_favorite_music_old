import { audioPlayer, volumeRange } from "../consts";

function setVolume() {
  audioPlayer.volume = volumeRange.value / 100;
}

volumeRange.addEventListener("input", setVolume);
