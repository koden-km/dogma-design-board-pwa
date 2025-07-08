import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { TT_POINTER, type ToolType } from "../toolbar/types.ts";
import type { Domain, Id } from "./types.ts";
import { createDomain } from "./util.ts";

export interface BoardState {
  currentDomainId: Id;
  currentTool: ToolType;
  domains: { [key: Id]: Domain };
}

const defaultDomain = createDomain(uuidv4(), "Event Storm");
const debugFooDomain = createDomain(uuidv4(), "Foo"); // DEBUG ONLY
const debugBarDomain = createDomain(uuidv4(), "Bar"); // DEBUG ONLY

const initialState: BoardState = {
  currentDomainId: defaultDomain.id,
  currentTool: TT_POINTER,
  domains: {
    [defaultDomain.id]: defaultDomain,
    [debugFooDomain.id]: debugFooDomain, // DEBUG ONLY
    [debugBarDomain.id]: debugBarDomain, // DEBUG ONLY
  },
};

const slice = createSlice({
  name: "board",
  initialState,
  reducers: {
    switchTool: (state, action: PayloadAction<{ tool: ToolType }>) => {
      const { payload } = action;
      state.currentTool = payload.tool;
    },

    switchDomain: (state, action: PayloadAction<{ domainId: Id }>) => {
      const { payload } = action;
      const domainId = payload.domainId;
      if (state.domains[domainId]) {
        state.currentDomainId = domainId;
      }
    },

    addDomain: (
      state,
      action: PayloadAction<{
        id?: Id;
        name: string;
      }>
    ) => {
      const { payload } = action;
      const { id = uuidv4(), name } = payload;
      state.domains[id] = createDomain(id, name);
    },
  },
});

export const { switchDomain, switchTool } = slice.actions;
export default slice;
