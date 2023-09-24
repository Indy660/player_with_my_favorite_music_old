const defaultTrackList = Object.keys(import.meta.glob("/music/*.mp3"));

const totalSongsSpan = document.getElementById(
  "totalSongsNum",
) as HTMLSpanElement;
totalSongsSpan.textContent = (defaultTrackList?.length).toString() || "0";

const randomModeBtn = document.getElementById("randomModeBtn");

interface TracksOptions {
  defaultTracks: string[];
}

interface Listener {
  (tracks: string[]): void;
}

class Tracks {
  private readonly defaultTracks: string[];
  private currentTracks: string[];
  private isRandom = false;
  private listeners: Listener[] = [];
  public readonly length: number;

  public constructor({ defaultTracks }: TracksOptions) {
    this.defaultTracks = defaultTracks;
    this.currentTracks = defaultTracks;
    this.length = defaultTracks.length;
  }

  // вызывается в самом начале
  public subscribe(listener: Listener) {
    this.listeners.push(listener);
    console.log("subscribe", this.listeners, listener);

    // не нужен т.к у нас нету отписки, треки статичны
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getTracks() {
    return this.currentTracks;
  }

  public toggleRandom() {
    this.isRandom = !this.isRandom;

    if (this.isRandom) {
      this.currentTracks = this.getRandomTracks();
    } else {
      this.currentTracks = this.defaultTracks;
    }

    this.listeners.forEach((l) => l(this.currentTracks));
    console.log("toggleRandom", this.listeners);
  }

  private getRandomTracks() {
    return this.defaultTracks
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}

const tracks = new Tracks({
  defaultTracks: defaultTrackList,
});

randomModeBtn?.addEventListener("click", () => {
  tracks.toggleRandom();
});

export { tracks };
