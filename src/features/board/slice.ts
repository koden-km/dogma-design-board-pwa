import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TT_POINTER, type ToolType } from "../toolbar/types.ts";

export interface BoardState {
  comment: string;
  currentTool: ToolType;
  title: string;
}

const initialState: BoardState = {
  comment: "",
  currentTool: TT_POINTER,
  title: "Event Storm Board",
};

const slice = createSlice({
  name: "board",
  initialState,
  reducers: {
    switchTool: (state, action: PayloadAction<{ tool: ToolType }>) => {
      const { payload } = action;
      state.currentTool = payload.tool;
    },
  },
});

export const { switchTool } = slice.actions;
export default slice;
