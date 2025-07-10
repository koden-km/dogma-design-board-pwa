import { useCallback, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks.js";
import { type ToolType } from "../toolbar/types.ts";
import slice, { switchDomain, switchTool, type BoardState } from "./slice.ts";
import type { Id } from "./types.ts";

export const useCurrentDomainId = () => useSelector().currentDomainId;
export const useCurrentTool = () => useSelector().currentTool;
export const useDomainWithId = (id: Id) => useSelector().domains[id];

export const useIsCurrentDomain = (domainId: Id) =>
  useSelector().currentDomainId === domainId;

export const useIsCurrentTool = (tool: ToolType) =>
  useSelector().currentTool === tool;

export const useCurrentDomain = () => {
  const { currentDomainId, domains } = useSelector();
  return domains[currentDomainId];
};

export const useDomainList = () => {
  const domains = useSelector().domains;
  return useMemo(() => Object.values(domains), [domains]);
};

export const useSwitchDomain = (domainId: Id) => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(switchDomain({ domainId }));
  }, [domainId, dispatch]);
};

export const useSwitchTool = (tool: ToolType) => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(switchTool({ tool }));
  }, [tool, dispatch]);
};

function useSelector(): BoardState {
  return useAppSelector((state) => state[slice.name]);
}
