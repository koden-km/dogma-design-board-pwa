import { useCallback } from "react";
import NoWrap from "@/components/NoWrap.tsx";
import {
  DDF_OP_GROUP,
  type DragIOGroupPayload,
  type DragPayload,
  type Id,
  type TimelinePath,
} from "../../types.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";

export interface ConceptDropAreaProps {
  path: TimelinePath;
  afterId: Id | undefined; // first in list if undefined
}

export default function ConceptDropArea(props: ConceptDropAreaProps) {
  const { path, afterId } = props;

  const dropHandler = useCallback(
    (payload: DragPayload) => {
      const data = payload as DragIOGroupPayload;
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
      console.log(`TODO: Add new concept! afterId=${afterId} path=`, path);
    },
    [afterId, path]
  );

  return (
    <DropArea accepts={DDF_OP_GROUP} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Concept
      </NoWrap>
    </DropArea>
  );
}
