import { useCallback } from "react";
import NoWrap from "@/components/NoWrap.tsx";
import {
  DDF_CONCEPT,
  type DragConceptPayload,
  type DragPayload,
  type DropConceptPayload,
  type Id,
  type TimelinePath,
} from "../../types.ts";
import { useMoveConcept } from "../../hooks.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";

export interface ConceptDropAreaProps {
  path: TimelinePath;
  afterId: Id | undefined; // first in list if undefined
}

export default function ConceptDropArea(props: ConceptDropAreaProps) {
  const { path, afterId } = props;
  const moveConcept = useMoveConcept();

  const dropHandler = useCallback(
    (payload: DragPayload) => {
      const source = payload as DragConceptPayload;

      // const target: DropConceptPayload = {
      //   path,
      //   afterId,
      // };
      // TODO(KM): Also flatten and remove path?
      const target: DropConceptPayload = {
        timelineId: path.timelineId,
        afterId,
      };

      moveConcept(source, target);
    },
    [afterId, moveConcept, path]
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
    <DropArea accepts={DDF_CONCEPT} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Concept
      </NoWrap>
    </DropArea>
  );
}
