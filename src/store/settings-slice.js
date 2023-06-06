import { createSlice } from "@reduxjs/toolkit";

const settingsInitialState = {
  theme: "colours",
  difficulty: 2,
  hideSettings: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: settingsInitialState,
  reducers: {
    selectThemeToggler(state, action) {
      state.theme = action.payload;
    },

    selectDifficultyToggler(state, action) {
      state.difficulty = action.payload;
    },

    hideSettings(state, action) {
      state.hideSettings = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;
export default settingsSlice.reducer;
