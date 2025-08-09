import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
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
import { useAddTimeline, useMoveTimeline } from "../../hooks.ts";

export interface TimelineDropAreaProps {
  domainId: Id;
  afterId: Id | undefined; // first in list if undefined
}

export default function TimelineDropArea(props: TimelineDropAreaProps) {
  const { domainId, afterId } = props;
  const moveTimeline = useMoveTimeline();
  const addTimeline = useAddTimeline();

  const dropHandler = useCallback(
    (payload: DragPayload) => {
      const source = payload as DragTimelinePayload;

      const target: DropTimelinePayload = {
        path: { domainId },
        afterId,
      };

      moveTimeline(source, target);
    },
    [afterId, domainId, moveTimeline]
  );

  const addHandler = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addTimeline(domainId, afterId, uuidv4());
  }, []);

  return (
    <DropArea accepts={DDF_TIMELINE} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Timeline
      </NoWrap>
    </DropArea>
  );
}
