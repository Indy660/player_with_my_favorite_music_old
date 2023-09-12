import { observer } from "./observer_music";

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
  console.log(131);
  randomModeState = !randomModeState;
  observer.setMusic(getMusicList());
}

// export {
//   tracks,
//   updateStateEvent
// }
randomModeBtn.addEventListener("click", changeState);
// TODO: починить импорт
// console.log(defaultTrackList);
// observer.setMusic(getMusicList());
// console.log(getMusicList());
// export default tracks;

// observer.observe((arg) => {
//   console.log(arg);
// });
