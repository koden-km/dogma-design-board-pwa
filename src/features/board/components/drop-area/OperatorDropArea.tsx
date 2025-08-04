import { useCallback } from "react";
import NoWrap from "@/components/NoWrap.tsx";
import {
  DDF_NODE_X,
  NIS_OPERATOR,
  type DragNodeInstPayload,
  type DragPayload,
  type DropNodeInstPayload,
  type NodeIOGroupPath,
  type NodeOperatorGroupPath,
} from "../../types.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";
import { useMoveNodeInst } from "../../hooks.ts";

export interface OperatorDropAreaProps {
  path: NodeOperatorGroupPath;
}

export default function OperatorDropArea(props: OperatorDropAreaProps) {
  const { path } = props;
  const moveNodeInst = useMoveNodeInst();

  const dropHandler = useCallback(
    (payload: DragPayload) => {
      const source = payload as DragNodeInstPayload;
      if (!source) return;

      const target: DropNodeInstPayload = {
        path: path as NodeIOGroupPath,
        slot: NIS_OPERATOR,
        afterId: undefined,
      };

      moveNodeInst(source, target);
    },
    [moveNodeInst, path]
  );

  const addHandler = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("TODO: Add new operator node! path=", path);
    },
    [path]
  );

  return (
    <DropArea accepts={DDF_NODE_X} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Operator
      </NoWrap>
    </DropArea>
  );
}
