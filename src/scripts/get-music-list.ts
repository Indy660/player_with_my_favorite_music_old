// @ts-ignore next line
const defaultTrackList = Object.keys(import.meta.glob("/music/*.mp3"));
const totalSongsSpan = document.getElementById(
  "totalSongsNum"
) as HTMLSpanElement;
totalSongsSpan.textContent = (defaultTrackList?.length).toString() || "0";

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

randomModeBtn.addEventListener("click", changeState);
// TODO: починить импорт
const tracks = getMusicList();
export default tracks;
