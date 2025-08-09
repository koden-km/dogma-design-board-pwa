import { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector, useAppDispatch } from "@/store/hooks.js";
import { type ToolType } from "@/features/toolbar/types.ts";
import slice, {
  addConcept,
  addDomain,
  addIOGroup,
  addOperatorGroup,
  addTimeline,
  addTimePoint,
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
  ConceptPath,
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
  NodeInst,
  OperatorGroupPath,
  TimelinePath,
  TimePointPath,
} from "./types.ts";
import {
  downloadFile,
  generateGoFileNodeDef,
  generateProtoFileNodeDef,
  safeFilenameGo,
  safeFilenameProto,
} from "./export-util.ts";

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

export const useExportNodeDef = (nodeInst: NodeInst) => {
  const domain = useDomainWithId(nodeInst.domainId);
  const nodeDef = useDomainNodeDef(nodeInst.domainId, nodeInst.defId);

  return useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (!nodeDef) {
        console.warn("No Node Def not found.");
        return;
      }

      downloadFile(
        safeFilenameGo(nodeDef.name),
        generateGoFileNodeDef(domain, nodeDef)
      );

      downloadFile(
        safeFilenameProto(nodeDef.name),
        generateProtoFileNodeDef(domain, nodeDef)
      );
    },
    [nodeDef]
  );
};

export const useAddDomain = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (id: Id, name: string) => {
      dispatch(addDomain({ id, name }));
    },
    [dispatch]
  );
};

export const useAddTimeline = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (domainId: Id, afterId: Id | undefined, id: Id) => {
      dispatch(addTimeline({ domainId, afterId, id }));
    },
    [dispatch]
  );
};

export const useAddConcept = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (
      path: TimelinePath,
      afterId: Id | undefined,
      id: Id,
      name: string,
      comment?: string
    ) => {
      dispatch(addConcept({ path, afterId, id, name, comment }));
    },
    [dispatch]
  );
};

export const useAddTimePoint = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (path: ConceptPath, afterId: Id | undefined, id: Id) => {
      dispatch(addTimePoint({ path, afterId, id }));
    },
    [dispatch]
  );
};

export const useAddOperatorGroup = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (path: TimePointPath, afterId: Id | undefined, id: Id) => {
      dispatch(addOperatorGroup({ path, afterId, id }));
    },
    [dispatch]
  );
};

export const useAddIOGroup = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (path: OperatorGroupPath, afterId: Id | undefined, id: Id) => {
      dispatch(addIOGroup({ path, afterId, id }));
    },
    [dispatch]
  );
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
