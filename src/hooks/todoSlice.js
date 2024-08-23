import { createSlice, nanoid } from "@reduxjs/toolkit";

const loginInitialState = {
  userDetails: null,
};

const themeInit = {
  theme: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: loginInitialState,
  reducers: {
    putLoginDetaild: (state, action) => {
      state.userDetails = action.payload;
      alert("user loggedin successfully");
    },
  },
});

export const Themechanger = createSlice({
  name: "theme",
  initialState: themeInit,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = action.payload;
      const elem = document.getElementById("root");
      if (state.theme) {
        elem.classList.add("bg-black/[0.8]");
        elem.classList.add("text-white");
      } else {
        elem.classList.remove("bg-black/[0.8]");
        elem.classList.remove("text-white");
      }
    },
  },
});

export const { putLoginDetaild } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

export const { toggleTheme } = Themechanger.actions;
export const themeReducer = Themechanger.reducer;
