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

export interface TimelineDropAreaProps {
  domainId: Id;
  afterId: Id | undefined; // first in list if undefined
}

export default function TimelineDropArea(props: TimelineDropAreaProps) {
  const { domainId, afterId } = props;

  const dropHandler = useCallback(
    (payload: DragAndDropPayload) => {
      const data = payload as DragAndDropNodeIOGroup;
      console.log(
        `DEBUG(KM): dropHandler() - domainId=${domainId} afterId=${afterId}\ndata=`,
        data
      );
    },
    [domainId, afterId]
  );

  const addHandler = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("TODO: Add timeline!");
  }, []);

  return (
    <DropArea accepts={DDF_OP_GROUP} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Timeline
      </NoWrap>
    </DropArea>
  );
}
