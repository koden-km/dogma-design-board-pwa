import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks.js";
import { type ToolType } from "../toolbar/types.ts";
import { switchTool, type BoardState } from "./slice.ts";

export const useComment = () => useSelector().comment;
export const useCurrentTool = () => useSelector().currentTool;
export const useTitle = () => useSelector().title;

export const useIsCurrentTool = (tool: ToolType) =>
  useSelector().currentTool === tool;

export const useSwitchTool = (tool: ToolType) => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(switchTool({ tool }));
  }, [tool, dispatch]);
};

function useSelector(): BoardState {
  return useAppSelector((state) => state.board);
}
