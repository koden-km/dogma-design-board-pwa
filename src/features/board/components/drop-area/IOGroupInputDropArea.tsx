import { useCallback } from "react";
import NoWrap from "@/components/NoWrap.tsx";
import {
  DDF_NODE_X,
  NIS_INPUT,
  type DragNodeInstPayload,
  type DragPayload,
  type DropNodeInstPayload,
  type IOGroupPath,
} from "../../types.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";
import { useMoveNodeInst } from "../../hooks.ts";

export interface IOGroupInputDropAreaProps {
  path: IOGroupPath;
}

export default function IOGroupInputDropArea(props: IOGroupInputDropAreaProps) {
  const { path } = props;
  const moveNodeInst = useMoveNodeInst();

  const dropHandler = useCallback(
    (payload: DragPayload) => {
      const source = payload as DragNodeInstPayload;
      if (!source) return;

      const target: DropNodeInstPayload = {
        path,
        slot: NIS_INPUT,
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
      console.log("TODO: Add new input node! path=", path);
    },
    [path]
  );

  return (
    <DropArea accepts={DDF_NODE_X} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Input Message
      </NoWrap>
    </DropArea>
  );
}
