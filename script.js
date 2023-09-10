import { audioPlayer, progressRange } from './consts.js'
import './scripts/set-volume.js'
import './scripts/set-progress-range.js'
import './scripts/set-time.js'

// const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const previousBtn = document.getElementById('previousBtn');
const nextBtn = document.getElementById('nextBtn');

const tracks =  Object.keys(import.meta.glob('/music/*.mp3'));

let currentTrackIndex = 0;
let isPlaying = false;

playPauseBtn.addEventListener('click', togglePlayPause);
previousBtn.addEventListener('click', previousTrack);
nextBtn.addEventListener('click', nextTrack);

function togglePlayPause() {
  console.log('togglePlayPause')
  isPlaying = !isPlaying;
  if (isPlaying) {
    playPauseBtn.classList.add('playing');
    audioPlayer.play();
  } else {
    playPauseBtn.classList.remove('playing');
    audioPlayer.pause();
  }
}

function nextTrack() {
  console.log('nextTrack')
  currentTrackIndex += 1;
  if (currentTrackIndex >= tracks.length) {
    currentTrackIndex = 0;
  }
  playTrack(tracks[currentTrackIndex]);
}

function previousTrack() {
  console.log('previousTrack')
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  playTrack(tracks[currentTrackIndex]);
}

function loadTrack(track) {
  audioPlayer.src = track;
}

function playTrack(track) {
  console.log('playTrack' , track)
  loadTrack(track);
  // TODO: не работает при переключении музыки
  // progressRange.value = 0

  // TODO: для дебагинга на всякий
  // console.dir(audioPlayer)
  if (isPlaying) {
    audioPlayer.play();

  }
}

loadTrack(tracks[currentTrackIndex]);
