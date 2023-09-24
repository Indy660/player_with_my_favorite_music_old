<script setup lang="ts">
defineProps({
  pathToFile: {
    type: String,
    default: "",
  },
});
// define
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
</script>

<template>
  <img
    id="logoImage"
    src="../../src/assets/default_logo.png"
    class="album-image"
    alt=""
  />
  <div class="artist-info">
    <div id="bandName" class="band">{{ bandName }}</div>
    <div id="songName" class="song">{{ songName }}</div>
  </div>
</template>

<style scoped>
.album-image {
  width: 200px;
  height: 200px;
}

.artist-info .band {
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 500;
}

.artist-info .song {
  font-size: 18px;
  font-weight: 600;
}
</style>
