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

export interface OperatorInputDropAreaProps {
  groupId: Id;
}

export default function OperatorInputDropArea(
  props: OperatorInputDropAreaProps
) {
  const { groupId } = props;

  const dropHandler = useCallback(
    (payload: DragAndDropPayload) => {
      const data = payload as DragAndDropNodeInst;
      console.log(
        `DEBUG(KM): dropHandler() - groupId=${groupId} - [${data.type}] instId=${data.instId}\ndata=`,
        data
      );
    },
    [groupId]
  );

  const addHandler = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("TODO: Add new input node!");
  }, []);

  return (
    <DropArea accepts={DDF_NODE_X} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Operator Input
      </NoWrap>
    </DropArea>
  );
}
