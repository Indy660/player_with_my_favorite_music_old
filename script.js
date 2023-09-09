import { audioPlayer } from './consts.js'
import './scripts/get-volume.js'

// const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const previousBtn = document.getElementById('previousBtn');
const nextBtn = document.getElementById('nextBtn');

const musicFolderPath = './music/';
const tracks = ['As I Lay Dying - Forever.mp3', 'As I Lay Dying - The Sound Оf Truth.mp3'];

let currentTrackIndex = 0;
let isPlaying = false;

playPauseBtn.addEventListener('click', togglePlayPause);
previousBtn.addEventListener('click', previousTrack);
nextBtn.addEventListener('click', nextTrack);

function togglePlayPause() {
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
  loadTrackAndPlay(tracks[currentTrackIndex]);
}

function previousTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrackAndPlay(tracks[currentTrackIndex]);
}

function loadTrack(track) {
  audioPlayer.src = musicFolderPath + track;
}

function loadTrackAndPlay(track) {
  loadTrack(track);
  if (isPlaying) {
    audioPlayer.play();
  }
}

const progressRange = document.getElementById('progressRange');
let isSeeking = false;

audioPlayer.addEventListener('timeupdate', updateProgress);
progressRange.addEventListener('input', seekAudio);
progressRange.addEventListener('mousedown', () => (isSeeking = true));
progressRange.addEventListener('mouseup', () => (isSeeking = false));

function updateProgress() {
  if (!isSeeking) {
    progressRange.value =  (audioPlayer.currentTime / audioPlayer.duration) * 100;
  }
}

function seekAudio() {
  audioPlayer.currentTime = (progressRange.value / 100) * audioPlayer.duration;
}

loadTrack(tracks[currentTrackIndex]);
