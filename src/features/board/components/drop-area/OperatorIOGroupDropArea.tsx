import { useCallback } from "react";
import {
  DDF_IO_GROUP,
  type DragAndDropNodeIOGroup,
  type DragAndDropPayload,
  type Id,
} from "../../types.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";
import NoWrap from "@/components/NoWrap.tsx";

export interface OperatorIOGroupDropAreaProps {
  groupId: Id;
  afterId: Id | undefined; // first in list if undefined
}

export default function OperatorIOGroupDropArea(
  props: OperatorIOGroupDropAreaProps
) {
  const { groupId, afterId } = props;

  const dropHandler = useCallback(
    (payload: DragAndDropPayload) => {
      const data = payload as DragAndDropNodeIOGroup;
      console.log(
        `DEBUG(KM): dropHandler() - groupId=${groupId} afterId=${afterId}\ndata=`,
        data
      );
    },
    [groupId, afterId]
  );

  const addHandler = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("TODO: Add new io group!");
  }, []);

  return (
    <DropArea accepts={DDF_IO_GROUP} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> IO Group
      </NoWrap>
    </DropArea>
  );
}
