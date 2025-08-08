import { useCallback } from "react";
import NoWrap from "@/components/NoWrap.tsx";
import {
  DDF_TIMELINE,
  type DragPayload,
  type DragTimelinePayload,
  type DropTimelinePayload,
  type Id,
} from "../../types.ts";
import AddButton from "./AddButton.tsx";
import DropArea from "./DropArea.tsx";
import { useMoveTimeline } from "../../hooks.ts";

export interface TimelineDropAreaProps {
  domainId: Id;
  afterId: Id | undefined; // first in list if undefined
}

export default function TimelineDropArea(props: TimelineDropAreaProps) {
  const { domainId, afterId } = props;
  const moveTimeline = useMoveTimeline();

  const dropHandler = useCallback(
    (payload: DragPayload) => {
      const source = payload as DragTimelinePayload;

      // const target: DropTimelinePayload = {
      //   path: { domainId },
      //   afterId,
      // };
      const target: DropTimelinePayload = {
        domainId,
        afterId,
      };

      moveTimeline(source, target);
    },
    [afterId, domainId, moveTimeline]
  );

  const addHandler = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("TODO: Add timeline!");
  }, []);

  return (
    <DropArea accepts={DDF_TIMELINE} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Timeline
      </NoWrap>
    </DropArea>
  );
}
