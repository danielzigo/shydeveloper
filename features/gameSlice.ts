import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  advancedMode: boolean;
  selected: number;
  score: number;
  openHowCredits: boolean;
  openRules: boolean;
}

const initialState: GameState = {
  advancedMode: false,
  selected: -1,
  score: 0,
  openHowCredits: false,
  openRules: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    toggleAdvancedMode(state) {
      state.advancedMode = !state.advancedMode;
    },
    setSelected(state, action: PayloadAction<number>) {
      state.selected = action.payload;
    },
    updateScore(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },
    resetScore(state) {
      state.score = 0;
    },
    setOpenHowCredits(state, action: PayloadAction<boolean>) {
      state.openHowCredits = action.payload;
    },
    setOpenRules(state, action: PayloadAction<boolean>) {
      state.openRules = action.payload;
    },
  },
});

export const {
  toggleAdvancedMode,
  setSelected,
  updateScore,
  resetScore,
  setOpenHowCredits,
  setOpenRules,
} = gameSlice.actions;

export default gameSlice.reducer;
