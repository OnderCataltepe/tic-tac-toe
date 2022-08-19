import { createSlice } from "@reduxjs/toolkit";
import manO from "../assets/manO.png";
import manX from "../assets/manX.png";
import tiePng from "../assets/tie.png";
const initialState = {
  firstPlayer: { name: "", score: 0, picture: manO },
  secondPlayer: { name: "", score: 0, picture: manX },
  tie: { isTie: false, picture: tiePng },
  winner: { isWinner: false, name: null, picture: null },
  option: { home: true, single: false, multiplayer: false },
  isHomePortal: false,
  isResetPortal: false,
  isGame: false,
  isMultiGame: false,
  isSingleGame: false,
  isO: true,
  difficulty: "",
  winningCells: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ],
  initialCells: [
    { value: 1, isX: "" },
    { value: 2, isX: "" },
    { value: 3, isX: "" },
    { value: 4, isX: "" },
    { value: 5, isX: "" },
    { value: 6, isX: "" },
    { value: 7, isX: "" },
    { value: 8, isX: "" },
    { value: 9, isX: "" },
  ],
};
export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startMulti: (state, action) => {
      state.isGame = true;
      state.isMultiGame = true;
      state.option.multiplayer = false;
      state.firstPlayer.name = action.payload.p1;
      state.secondPlayer.name = action.payload.p2;
    },
    startSingle: (state, action) => {
      state.isGame = true;
      state.isSingleGame = true;
      state.option.single = false;
      state.difficulty = action.payload.difficulty;
      state.firstPlayer.name = action.payload.name;
      state.secondPlayer.name = "PC";
    },
    win: (state, action) => {
      state[action.payload.name].score += 1;
      state.winner.isWinner = true;
      state.winner.picture = state[action.payload.name].picture;
      state.winner.name = state[action.payload.name].name;
    },
    continue: (state) => {
      state.tie = initialState.tie;
      state.winner = initialState.winner;
      state.isO = !state.isO;
    },
    tie: (state, action) => {
      state.tie.isTie = action.payload.type;
    },
    turn: (state) => {
      state.isO = !state.isO;
    },
    resetScore: (state) => {
      state.firstPlayer.score = 0;
      state.secondPlayer.score = 0;
      state.isResetPortal = false;
    },
    option: (state, action) => {
      const value = action.payload.type;
      state.option[value] = true;
      state.option.home = false;
    },
    goHome: () => {
      return initialState;
    },
    openPortal: (state, action) => {
      state[action.payload] = true;
    },
    cancel: (state, action) => {
      state[action.payload] = false;
    },
  },
});

export default gameSlice.reducer;
export const gameActions = gameSlice.actions;
