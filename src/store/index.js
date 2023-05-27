import { configureStore } from "@reduxjs/toolkit";
import SettingsSlice from "./settings-slice";

const store = configureStore({
  reducer: {
    settings: SettingsSlice.reducer,
  },
});

export default store;
