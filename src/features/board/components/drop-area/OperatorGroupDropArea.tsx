import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import NoWrap from "@/components/NoWrap.tsx";
import {
  DDF_OP_GROUP,
  type DragOperatorGroupPayload,
  type DragPayload,
  type DropOperatorGroupPayload,
  type Id,
  type TimePointPath,
} from "../../types.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";
import { useAddOperatorGroup, useMoveOperatorGroup } from "../../hooks.ts";

export interface OperatorGroupDropAreaProps {
  path: TimePointPath;
  afterId: Id | undefined; // first in list if undefined
}

export default function OperatorGroupDropArea(
  props: OperatorGroupDropAreaProps
) {
  const { path, afterId } = props;
  const moveOperatorGroup = useMoveOperatorGroup();
  const addOperatorGroup = useAddOperatorGroup();

  const dropHandler = useCallback(
    (payload: DragPayload) => {
      const source = payload as DragOperatorGroupPayload;

      const target: DropOperatorGroupPayload = {
        path,
        afterId,
      };

      moveOperatorGroup(source, target);
    },
    [afterId, moveOperatorGroup, path]
  );

  const addHandler = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      addOperatorGroup(path, afterId, uuidv4());
    },
    [afterId, path]
  );

  return (
    <DropArea accepts={DDF_OP_GROUP} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Message Handler Group
      </NoWrap>
    </DropArea>
  );
}
