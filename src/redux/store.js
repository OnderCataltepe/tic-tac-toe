import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./GameSlice";
export default configureStore({
  reducer: { gameReducer },
});
