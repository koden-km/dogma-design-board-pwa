import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import NoWrap from "@/components/NoWrap.tsx";
import {
  DDF_CONCEPT,
  type DragConceptPayload,
  type DragPayload,
  type DropConceptPayload,
  type Id,
  type TimelinePath,
} from "../../types.ts";
import { useAddConcept, useMoveConcept } from "../../hooks.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";

export interface ConceptDropAreaProps {
  path: TimelinePath;
  afterId: Id | undefined; // first in list if undefined
}

export default function ConceptDropArea(props: ConceptDropAreaProps) {
  const { path, afterId } = props;
  const moveConcept = useMoveConcept();
  const addConcept = useAddConcept();

  const dropHandler = useCallback(
    (payload: DragPayload) => {
      const source = payload as DragConceptPayload;

      const target: DropConceptPayload = {
        path,
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
      const id = uuidv4();
      addConcept(path, afterId, id, `Concept-${id.split("-", 1)[0]}`);
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
