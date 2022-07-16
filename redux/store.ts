import { configureStore } from "@reduxjs/toolkit";
import { stateSlice } from "./state-slice";

const store = configureStore({
  reducer: stateSlice.reducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>