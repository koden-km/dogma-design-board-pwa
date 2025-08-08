import { useCallback, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks.js";
import { type ToolType } from "@/features/toolbar/types.ts";
import slice, {
  moveConcept,
  moveIOGroup,
  moveNodeInst,
  moveOperatorGroup,
  moveTimeline,
  moveTimePoint,
  selectId,
  switchDomain,
  switchTool,
  type BoardState,
} from "./slice.ts";
import type {
  DragConceptPayload,
  DragIOGroupPayload,
  DragNodeInstPayload,
  DragOperatorGroupPayload,
  DragTimelinePayload,
  DragTimePointPayload,
  DropConceptPayload,
  DropIOGroupPayload,
  DropNodeInstPayload,
  DropOperatorGroupPayload,
  DropTimelinePayload,
  DropTimePointPayload,
  Id,
} from "./types.ts";

export const useCurrentDomainId = () => useSelector().currentDomainId;
export const useCurrentTool = () => useSelector().currentTool;
export const useDomainName = (id: Id) => useSelector().domains[id].name;
export const useDomainWithId = (id: Id) => useSelector().domains[id];
export const useIsSelected = (id: Id) => useSelector().selectedId === id;
export const useSelectedId = () => useSelector().selectedId;

export const useDomainNodeDef = (domainId: Id, defId: Id) =>
  useSelector().domains[domainId].nodeDefinitions[defId];

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

export const useMoveNodeInst = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (source: DragNodeInstPayload, target: DropNodeInstPayload) => {
      dispatch(moveNodeInst({ source, target }));
    },
    [dispatch]
  );
};

export const useMoveIOGroup = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (source: DragIOGroupPayload, target: DropIOGroupPayload) => {
      dispatch(moveIOGroup({ source, target }));
    },
    [dispatch]
  );
};

export const useMoveOperatorGroup = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (source: DragOperatorGroupPayload, target: DropOperatorGroupPayload) => {
      dispatch(moveOperatorGroup({ source, target }));
    },
    [dispatch]
  );
};

export const useMoveTimePoint = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (source: DragTimePointPayload, target: DropTimePointPayload) => {
      dispatch(moveTimePoint({ source, target }));
    },
    [dispatch]
  );
};

export const useMoveConcept = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (source: DragConceptPayload, target: DropConceptPayload) => {
      dispatch(moveConcept({ source, target }));
    },
    [dispatch]
  );
};

export const useMoveTimeline = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (source: DragTimelinePayload, target: DropTimelinePayload) => {
      dispatch(moveTimeline({ source, target }));
    },
    [dispatch]
  );
};

export const useSelectId = (id: Id) => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch(selectId({ id }));
  }, [id, dispatch]);
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
