import { createSlice } from "@reduxjs/toolkit";
import StartSound from "../assets/sounds/start.mp3";
import SequenceSound from "../assets/sounds/sequence.mp3";
import TileClickSound from "../assets/sounds/game-button-click.mp3";
import GameOverSound from "../assets/sounds/gameover.mp3";

const playSound = (name) => {
  var audio = new Audio(name);

  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0;
  }
  audio.play();
};

const colours = {
  name: "colours",
  title: "Colours",
  tiles: [
    "redColour",
    "blueColour",
    "greenColour",
    "yellowColour",
    "orangeColour",
    "purpleColour",
    "magentaColour",
    "darkGrayColour",
    "cyanColour",
  ],
  gameOverImages: ["x-mark"],
};

const elonMusk = {
  name: "elon-musk",
  title: "Elon Musk",
  tiles: [
    "cowboy",
    "cowboy2",
    "doctor",
    "crypto",
    "wario",
    "iceland",
    "tesla",
    "spacex",
    "neuralink",
    "roadster",
    "doubleok",
    "smoking",
    "smoking2",
    "cool",
    "twitter",
  ],
  gameOverImages: [
    "elon-disappointed",
    "elon-mad",
    "elon-really",
    "elon-what",
    "protestor",
  ],
};

const theOffice = {
  name: "the-office",
  title: "The Office",
  tiles: [
    "andy",
    "angela",
    "creed",
    "dwight",
    "dwight2",
    "dwight-overjoyed",
    "dwight-neckthing",
    "jim",
    "kelly",
    "kevin",
    "kevin2",
    "michael",
    "michael-boss",
    "pam",
    "ryan",
    "toby",
    "stanley",
    "stanley-curious",
    "stanley-himself",
    "stanley-crossedarms",
  ],
  gameOverImages: ["dwight-pissed", "scott-crying", "scott-mad", "scott-nooo"],
};

const initialState = {
  title: "",
  theme: "",
  numberOfTiles: 0,
  tiles: [],
  gamePattern: [],
  isGameStarted: false,
  isGameOver: false,
  currentScore: 0,
  highestScore: 0,
  playingIndex: 0,
  gameOverImages: [],
  flashTile: null,
  isClickedTile: {},
  freezeTiles: true,
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    startGame(state) {
      state.freezeTiles = true;
      state.isGameStarted = true;
      state.isGameOver = false;
      playSound(StartSound);
    },

    resetPattern(state) {
      state.isGameStarted = false;
      state.isGameOver = false;
      state.playingIndex = 0;
      state.gamePattern = [];
    },

    submitSettings(state, action) {
      const selectedSettings = action.payload;

      state.theme = selectedSettings.theme;
      state.numberOfTiles = selectedSettings.difficulty;

      const selectedTheme = state.theme;
      const numberOfTiles = state.numberOfTiles;

      let theme;

      switch (selectedTheme) {
        case "colours":
          theme = colours;
          break;

        case "elon-musk":
          theme = elonMusk;
          break;

        case "the-office":
          theme = theOffice;
          break;

        default:
          theme = colours;
          break;
      }

      const randomlyArrangedTiles = theme.tiles
        .map((pattern) => ({ pattern, r: Math.random() }))
        .sort((a, b) => a.r - b.r)
        .map((a) => a.pattern)
        .slice(0, numberOfTiles);

      state.tiles = randomlyArrangedTiles;
      state.title = theme.title;
      state.gameOverImages = theme.gameOverImages;
    },

    gameOver(state) {
      state.isGameOver = true;
      state.isGameStarted = false;
      playSound(GameOverSound);
    },

    addNextSequence(state) {
      const patternLength = state.numberOfTiles;
      const previousPattern = state.gamePattern;
      const randomNumber = Math.floor(Math.random() * patternLength); // randomize from 1 to difficulty number
      const nextRandomTile = state.tiles[randomNumber]; // next random tile to be flashed

      let newPattern = [];
      newPattern = [...previousPattern, nextRandomTile];

      state.gamePattern = newPattern;
    },

    freezeTiles(state, action) {
      state.freezeTiles = action.payload;
    },

    flashTile(state, action) {
      state.flashTile = action.payload;

      if (state.flashTile) {
        playSound(SequenceSound);
      }
    },

    isClickedTile(state, action) {
      const { id, value } = action.payload;

      state.isClickedTile[id] = value;

      if (value) {
        playSound(TileClickSound);
      }
    },

    storePlayingIndex(state, action) {
      state.playingIndex = action.payload;
    },

    storeCurrentScore(state, action) {
      state.currentScore = action.payload;
    },

    storeHighestScore(state, action) {
      state.highestScore = action.payload;
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
