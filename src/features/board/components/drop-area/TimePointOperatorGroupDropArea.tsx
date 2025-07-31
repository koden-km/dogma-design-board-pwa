import { useCallback } from "react";
import {
  DDF_OP_GROUP,
  type DragAndDropNodeIOGroup,
  type DragAndDropPayload,
  type Id,
} from "../../types.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";
import NoWrap from "@/components/NoWrap.tsx";

export interface TimePointOperatorGroupDropAreaProps {
  timePointId: Id;
  afterId: Id | undefined; // first in list if undefined
}

export default function TimePointOperatorGroupDropArea(
  props: TimePointOperatorGroupDropAreaProps
) {
  const { timePointId, afterId } = props;

  const dropHandler = useCallback(
    (payload: DragAndDropPayload) => {
      const data = payload as DragAndDropNodeIOGroup;
      console.log(
        `DEBUG(KM): dropHandler() - timePointId=${timePointId} afterId=${afterId}\ndata=`,
        data
      );
    },
    [timePointId, afterId]
  );

  const addHandler = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("TODO: Add new time point operator group!");
  }, []);

  return (
    <DropArea accepts={DDF_OP_GROUP} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Operator Group
      </NoWrap>
    </DropArea>
  );
}
