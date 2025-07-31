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

export interface ConceptDropAreaProps {
  timelineId: Id;
  afterId: Id | undefined; // first in list if undefined
}

export default function ConceptDropArea(props: ConceptDropAreaProps) {
  const { timelineId, afterId } = props;

  const dropHandler = useCallback(
    (payload: DragAndDropPayload) => {
      const data = payload as DragAndDropNodeIOGroup;
      console.log(
        `DEBUG(KM): dropHandler() - timelineId=${timelineId} afterId=${afterId}\ndata=`,
        data
      );
    },
    [timelineId, afterId]
  );

  const addHandler = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("TODO: Add new concept!");
  }, []);

  return (
    <DropArea accepts={DDF_OP_GROUP} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Concept
      </NoWrap>
    </DropArea>
  );
}
