import { useCallback } from "react";
import {
  DDF_NODE_X,
  type DragAndDropNodeInst,
  type DragAndDropPayload,
  type Id,
} from "../../types.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";
import NoWrap from "@/components/NoWrap.tsx";

export interface OperatorOutputDropAreaProps {
  groupId: Id;
  afterId: Id | undefined; // first in list if undefined
}

export default function OperatorOutputDropArea(
  props: OperatorOutputDropAreaProps
) {
  const { groupId, afterId } = props;

  const dropHandler = useCallback(
    (payload: DragAndDropPayload) => {
      const data = payload as DragAndDropNodeInst;
      console.log(
        `DEBUG(KM): dropHandler() - groupId=${groupId} afterId=${afterId} - [${data.type}] instId=${data.instId}\ndata=`,
        data
      );
    },
    [groupId, afterId]
  );

  const addHandler = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("TODO: Add new output node!");
  }, []);

  return (
    <DropArea accepts={DDF_NODE_X} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Operator Output
      </NoWrap>
    </DropArea>
  );
}
