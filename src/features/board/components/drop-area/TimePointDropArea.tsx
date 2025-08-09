import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import NoWrap from "@/components/NoWrap.tsx";
import {
  DDF_TIME_POINT,
  type ConceptPath,
  type DragPayload,
  type DragTimePointPayload,
  type DropTimePointPayload,
  type Id,
} from "../../types.ts";
import { useAddTimePoint, useMoveTimePoint } from "../../hooks.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";

export interface TimePointDropAreaProps {
  path: ConceptPath;
  afterId: Id | undefined; // first in list if undefined
}

export default function TimePointDropArea(props: TimePointDropAreaProps) {
  const { path, afterId } = props;
  const moveTimePoint = useMoveTimePoint();
  const addTimePoint = useAddTimePoint();

  const dropHandler = useCallback(
    (payload: DragPayload) => {
      const source = payload as DragTimePointPayload;

      const target: DropTimePointPayload = {
        path,
        afterId,
      };

      moveTimePoint(source, target);
    },
    [afterId, moveTimePoint, path]
  );

  const addHandler = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      addTimePoint(path, afterId, uuidv4());
    },
    [afterId, path]
  );

  return (
    <DropArea accepts={DDF_TIME_POINT} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Time Point
      </NoWrap>
    </DropArea>
  );
}
