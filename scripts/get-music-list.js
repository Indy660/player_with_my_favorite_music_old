// import {audioPlayer, progressRange} from "../consts.js";

// audioPlayer.addEventListener('timeupdate', updateProgress);
// progressRange.addEventListener('input', seekAudio);
//
// function updateProgress() {
//   progressRange.value =  (audioPlayer.currentTime / audioPlayer.duration) * 100;
// }
//
// function seekAudio() {
//   audioPlayer.currentTime = (progressRange.value / 100) * audioPlayer.duration;
// }

// let state = 'начальное состояние';
// const updateStateEvent = new CustomEvent('state-updated', { detail: state });
//
// function updateState() {
//   // Изменение состояния
//   state = 'новое состояние';
//
//   // Генерация пользовательского события
//   const updateStateEvent = new CustomEvent('state-updated', { detail: state });
//   document.dispatchEvent(updateStateEvent);
// }

// let state = 'начальное состояние';
//
// function updateState() {
//   // Изменение состояния
//   state = 'новое состояние';
//
//   // Генерация события обновления состояния
//   const event = new CustomEvent(updateStateEvent, { detail: state });
//   document.dispatchEvent(event);
// }
//
// function addStateUpdateListener(callback) {
//   document.addEventListener(updateStateEvent, (event) => {
//     const newState = event.detail;
//     callback(newState);
//   });
// }
//
// export { tracks, addStateUpdateListener };

const defaultTrackList = Object.keys(import.meta.glob("/music/*.mp3"));
const totalSongsSpan = document.getElementById("totalSongsNum");
totalSongsSpan.textContent = defaultTrackList?.length || "0";

const randomModeBtn = document.getElementById("randomModeBtn");
let randomModeState = false;

function randomMusicList() {
  return defaultTrackList
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function getMusicList() {
  console.log("getMusicList", randomModeState);
  return randomModeState ? randomMusicList() : defaultTrackList;
}

function changeState() {
  randomModeState = !randomModeState;
  getMusicList();
}

// export {
//   tracks,
//   updateStateEvent
// }
randomModeBtn.addEventListener("click", changeState);
// TODO: починить импорт
const tracks = getMusicList();
export default tracks;
