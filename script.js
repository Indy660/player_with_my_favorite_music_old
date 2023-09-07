const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const nextBtn = document.getElementById('nextBtn');

const tracks = ['audio1.mp3', 'audio2.mp3', 'audio3.mp3'];
let currentTrackIndex = 0;

playBtn.addEventListener('click', play);
stopBtn.addEventListener('click', stop);
nextBtn.addEventListener('click', nextTrack);

function play() {
  audioPlayer.play();
}

function stop() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
}

function nextTrack() {
  currentTrackIndex += 1;
  if (currentTrackIndex >= tracks.length) {
    currentTrackIndex = 0;
  }
  audioPlayer.src = tracks[currentTrackIndex];
  play();
}
