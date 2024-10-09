// Step 1
import { createSlice } from "@reduxjs/toolkit";

// Step 2
export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    value: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.value = !state.value;
    },
  },
});

// Step 3
export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
