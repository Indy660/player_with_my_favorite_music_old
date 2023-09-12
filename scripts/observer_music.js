class Observer {
  listener = "";

  music = [];

  observe(callback) {
    this.listener = callback;
  }

  getMusic() {
    return this.music;
  }

  setMusic(music) {
    this.music = music;
    if (this.listener) {
      this.listener(this.music);
    }
  }
}

const observer = new Observer();

// eslint-disable-next-line import/prefer-default-export
export { observer };
