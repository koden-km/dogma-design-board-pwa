import { useCallback } from "react";
import {
  DDF_OP_GROUP,
  type DragNodeIOGroupPayload,
  type DragPayload,
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
    (payload: DragPayload) => {
      const data = payload as DragNodeIOGroupPayload;
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
