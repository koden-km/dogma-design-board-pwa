import { useCallback } from "react";
import NoWrap from "@/components/NoWrap.tsx";
import {
  DDF_NODE_X,
  NIS_OUTPUT,
  type DragNodeInstPayload,
  type DragPayload,
  type DropNodeInstPayload,
  type Id,
  type IOGroupPath,
} from "../../types.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";
import { useMoveNodeInst } from "../../hooks.ts";

export interface OperatorOutputDropAreaProps {
  path: IOGroupPath;
  afterId: Id | undefined; // first in list if undefined
}

export default function OperatorOutputDropArea(
  props: OperatorOutputDropAreaProps
) {
  const { path, afterId } = props;
  const moveNodeInst = useMoveNodeInst();

  const dropHandler = useCallback(
    (payload: DragPayload) => {
      const source = payload as DragNodeInstPayload;
      if (!source) return;

      const target: DropNodeInstPayload = {
        path,
        slot: NIS_OUTPUT,
        afterId,
      };

      moveNodeInst(source, target);
    },
    [afterId, moveNodeInst, path]
  );

  const addHandler = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("TODO: Add new output node! path=", path);
    },
    [path]
  );

  return (
    <DropArea accepts={DDF_NODE_X} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Operator Output
      </NoWrap>
    </DropArea>
  );
}
