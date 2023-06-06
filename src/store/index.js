import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settings-slice";
import gameReducer from "./game-slice";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    game: gameReducer,
  },
});

export default store;
