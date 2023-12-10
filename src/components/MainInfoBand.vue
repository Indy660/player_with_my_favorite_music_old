<script lang="ts">
import { defineComponent } from "vue";
// const TRACK_LOGO_OPTIONS = Object.keys(import.meta.glob("../assets/*"));

export default defineComponent({
  name: "MainInfoBand",
  props: {
    fullSongName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      imagePaths: {},
    };
  },
  async created() {
    const images = import.meta.glob("@assets/images/*");
    for (const path in images) {
      const imageName = path.replace(/^.*\/(.*)\.\w+$/, "$1"); // Получение имени файла без расширения
      this.imagePaths[imageName] = (await images[path]()).default; // Динамический импорт и сохранение пути к изображению в объекте
      console.log("imagePaths", this.imagePaths);
    }
  },
  computed: {
    getLogoImage() {
      // console.log(
      //   this.fullSongName,
      //   this.fullSongName.includes("1.5 кг Отличного Пюре"),
      // );
      // const { bandName } = this.getInfoBand;
      // console.log(
      //   bandName,
      //   TRACK_LOGO_OPTIONS,
      //   TRACK_LOGO_OPTIONS.find((item) => item.includes(bandName)),
      // );
      // // "../src/assets/default_logo.png"
      // return (
      //   TRACK_LOGO_OPTIONS.find((item) => item.includes(bandName)) ||
      //   "../src/assets/default_logo.png"
      // );

      const { bandName } = this.getInfoBand;
      return this.imagePaths[bandName] || this.imagePaths?.default_logo;
      // if (this.fullSongName.includes("1.5 кг Отличного Пюре")) {
      //   return `${pathToImages}1.5_kg.jpg`;
      // }
      // if (this.fullSongName.includes("Anaal Nathrakh")) {
      //   return `${pathToImages}anaal_nathrakh_official_logo.jpeg`;
      // }
      // if (this.fullSongName.includes("As I Lay Dying")) {
      //   return `${pathToImages}as_i_lay_dying.jpg`;
      // }
      // if (this.fullSongName.includes("August Burns Red")) {
      //   return `${pathToImages}august_burns_red_thrill_seeker.jpg`;
      // }
      // if (this.fullSongName.includes("Between The Buried And Me")) {
      //   return `${pathToImages}btbam.webp`;
      // }
      // if (this.fullSongName.includes("The Maid")) {
      //   return `${pathToImages}maidcore.jpg`;
      // }
      // if (this.fullSongName.includes("What Mad Universe")) {
      //   return `${pathToImages}what_mad_universe.jpg`;
      // }
      // return `${pathToImages}default_logo.png`;
    },
    getInfoBand() {
      let [bandName, songName] = this.fullSongName.split(" - ");
      return {
        bandName: bandName,
        songName: songName,
      };
    },
  },
});
</script>

<template>
  <img :src="getLogoImage" class="album-image" alt="" />
  <div class="artist-info">
    <div class="band">{{ getInfoBand.bandName }}</div>
    <div class="song">{{ getInfoBand.songName }}</div>
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
