import { useCallback } from "react";
import NoWrap from "@/components/NoWrap.tsx";
import {
  DDF_OP_GROUP,
  type ConceptPath,
  type DragNodeIOGroupPayload,
  type DragPayload,
  type Id,
} from "../../types.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";

export interface TimePointDropAreaProps {
  path: ConceptPath;
  afterId: Id | undefined; // first in list if undefined
}

export default function TimePointDropArea(props: TimePointDropAreaProps) {
  const { path, afterId } = props;

  const dropHandler = useCallback(
    (payload: DragPayload) => {
      const data = payload as DragNodeIOGroupPayload;
      console.log(
        `DEBUG(KM): dropHandler() - path=${JSON.stringify(
          path
        )} afterId=${afterId}\ndata=`,
        data
      );
    },
    [path, afterId]
  );

  const addHandler = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(`TODO: Add new time point! afterId=${afterId} path=`, path);
    },
    [afterId, path]
  );

  return (
    <DropArea accepts={DDF_OP_GROUP} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Time Point
      </NoWrap>
    </DropArea>
  );
}
