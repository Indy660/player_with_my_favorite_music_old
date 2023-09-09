import {audioPlayer, volumeRange} from '../consts.js'

volumeRange.addEventListener('input', setVolume);

function setVolume() {
  audioPlayer.volume = volumeRange.value / 100;
}
