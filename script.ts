import { audioPlayer } from "./src/consts";
import "./src/scripts/set-volume";
import "./src/scripts/set-progress-range";
import "./src/scripts/set-time";
import { tracks } from "./src/scripts/get-music-list";

// main
const playPauseBtn = document.getElementById("playPauseBtn")!;
const previousBtn = document.getElementById("previousBtn")!;
const nextBtn = document.getElementById("nextBtn")!;

// other
const currentSongNum = document.getElementById("currentSongNum")!;
const logoImage = document.getElementById("logoImage") as HTMLImageElement;
const bandName = document.getElementById("bandName")!;
const songName = document.getElementById("songName")!;

let currentTrackIndex = 0;
let isPlaying = false;

function setLogo(track: string) {
  const pathToImages = "./images/";
  if (track.includes("1.5 кг Отличного Пюре")) {
    logoImage.src = `${pathToImages}1.5_kg.jpg`;
    return null;
  }
  if (track.includes("Anaal Nathrakh")) {
    logoImage.src = `${pathToImages}anaal_nathrakh_official_logo.jpeg`;
    return null;
  }
  if (track.includes("As I Lay Dying")) {
    logoImage.src = `${pathToImages}as_i_lay_dying.jpg`;
    return null;
  }
  if (track.includes("August Burns Red")) {
    logoImage.src = `${pathToImages}august_burns_red_thrill_seeker.jpg`;
    return null;
  }
  if (track.includes("Between The Buried And Me")) {
    logoImage.src = `${pathToImages}btbam.webp`;
    return null;
  }
  if (track.includes("The Maid")) {
    logoImage.src = `${pathToImages}maidcore.jpg`;
    return null;
  }
  if (track.includes("What Mad Universe")) {
    logoImage.src = `${pathToImages}what_mad_universe.jpg`;

    return null;
  }
  logoImage.src = `${pathToImages}default_logo.png`;
  return null;
}

function setInfoBand(track: string) {
  const indexLastSlash = track.lastIndexOf("/");
  const fullNameSong = track.substring(indexLastSlash + 1);
  const [band, song] = fullNameSong.split(" - ");
  bandName.textContent = band;
  songName.textContent = song.slice(0, song.lastIndexOf("."));
}

function loadTrack(track: string) {
  audioPlayer.src = track;
  setLogo(track);
  setInfoBand(track);
}

function playTrack(track: string) {
  console.log("playTrack", track);
  loadTrack(track);
  // TODO: не работает при переключении музыки
  // progressRange.value = 0

  // TODO: для дебагинга на всякий
  // console.dir(audioPlayer)

  currentSongNum.textContent = (currentTrackIndex + 1).toString();
  if (isPlaying) {
    audioPlayer.play().then((r) => r);
  }
}
function togglePlayPause() {
  console.log("togglePlayPause");
  isPlaying = !isPlaying;
  if (isPlaying) {
    playPauseBtn.classList.add("playing");
    audioPlayer.play().then((r) => r);
  } else {
    playPauseBtn.classList.remove("playing");
    audioPlayer.pause();
  }
}

function nextTrack() {
  console.log("nextTrack");
  currentTrackIndex += 1;
  if (currentTrackIndex >= tracks.length) {
    currentTrackIndex = 0;
  }
  playTrack(tracks.getTracks()[currentTrackIndex]);
}

function previousTrack() {
  console.log("previousTrack");
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  playTrack(tracks.getTracks()[currentTrackIndex]);
}

playPauseBtn.addEventListener("click", togglePlayPause);
previousBtn.addEventListener("click", previousTrack);
nextBtn.addEventListener("click", nextTrack);
audioPlayer.addEventListener("ended", nextTrack);

function onTracksUpdate(nextTracks: string[]) {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;

  // const tracks =  getMusicList();
  currentTrackIndex = 0;
  isPlaying = false;

  loadTrack(nextTracks[0]);
}

tracks.subscribe(onTracksUpdate);

onTracksUpdate(tracks.getTracks());
