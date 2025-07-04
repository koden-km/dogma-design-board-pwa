import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "../features/board/slice.ts";

export const store = configureStore({
  reducer: {
    [boardSlice.name]: boardSlice.reducer,
  },
});

// Infer types from the store
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
