import { createSlice } from "@reduxjs/toolkit";

const settingsInitialState = {
  patternTheme: "colours",
  // easy: 2 tiles; medium: 4 tiles; hard: 9 tiles
  difficulty: 4,
  hideSettings: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: settingsInitialState,
  reducers: {
    patternTheme(state, action) {
      state.patternTheme = action.payload;
    },

    difficulty(state, action) {
      state.difficulty = action.payload;
    },

    hideSettings(state) {
      state.hideSettings = true;
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice;
