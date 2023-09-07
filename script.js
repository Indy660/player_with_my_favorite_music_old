// const gamma = require('./music');
// console.log(gamma)

const fs = require('fs');
console.log(fs)

const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const nextBtn = document.getElementById('nextBtn');
const previousBtn = document.getElementById('previousBtn');

const musicFolderPath = './music/';
const tracks = ['As I Lay Dying - Forever.mp3'];
// const tracks = folderWithMusic
console.log(tracks)
let currentTrackIndex = 0;

playBtn.addEventListener('click', play);
stopBtn.addEventListener('click', stop);
nextBtn.addEventListener('click', nextTrack);
previousBtn.addEventListener('click', previousTrack);

function play() {
  console.log('play')
  audioPlayer.play();
}

function stop() {
  console.log('stop')
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
}

function nextTrack() {
  console.log('nextTrack')
  currentTrackIndex += 1;
  if (currentTrackIndex >= tracks.length) {
    currentTrackIndex = 0;
  }
  loadTrack(tracks[currentTrackIndex]);
}

function previousTrack() {
  console.log('previousTrack')
  currentTrackIndex -= 1;
  if (currentTrackIndex < 0) {
    currentTrackIndex = tracks.length - 1;
  }
  loadTrack(tracks[currentTrackIndex]);
}

function loadTrack(track) {
  console.log('loadTrack', track)
  audioPlayer.src = musicFolderPath + track;
  play();
}
