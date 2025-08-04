import { useCallback } from "react";
import NoWrap from "@/components/NoWrap.tsx";
import {
  DDF_OP_GROUP,
  type DragIOGroupPayload,
  type DragPayload,
  type Id,
  type TimePointPath,
} from "../../types.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";

export interface OperatorGroupDropAreaProps {
  path: TimePointPath;
  afterId: Id | undefined; // first in list if undefined
}

export default function OperatorGroupDropArea(
  props: OperatorGroupDropAreaProps
) {
  const { path, afterId } = props;

  const dropHandler = useCallback(
    (payload: DragPayload) => {
      const data = payload as DragIOGroupPayload;
      console.log(
        `DEBUG(KM): dropHandler() - path=${JSON.stringify(
          path
        )} afterId=${afterId}\ndata=`,
        data
      );
    },
    [path, afterId]
  );

  const addHandler = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(
        `TODO: Add new time point operator group! afterId=${afterId} path=`,
        path
      );
    },
    [afterId, path]
  );

  return (
    <DropArea accepts={DDF_OP_GROUP} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Operator Group
      </NoWrap>
    </DropArea>
  );
}
