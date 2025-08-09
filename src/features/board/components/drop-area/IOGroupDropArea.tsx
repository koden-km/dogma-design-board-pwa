import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import NoWrap from "@/components/NoWrap.tsx";
import {
  DDF_IO_GROUP,
  type DragIOGroupPayload,
  type DragPayload,
  type DropIOGroupPayload,
  type Id,
  type OperatorGroupPath,
} from "../../types.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";
import { useAddIOGroup, useMoveIOGroup } from "../../hooks.ts";

export interface IOGroupDropAreaProps {
  path: OperatorGroupPath;
  afterId: Id | undefined; // first in list if undefined
}

export default function IOGroupDropArea(props: IOGroupDropAreaProps) {
  const { path, afterId } = props;
  const moveIOGroup = useMoveIOGroup();
  const addIOGroup = useAddIOGroup();

  const dropHandler = useCallback(
    (payload: DragPayload) => {
      const source = payload as DragIOGroupPayload;

      const target: DropIOGroupPayload = {
        path,
        afterId,
      };

      moveIOGroup(source, target);
    },
    [afterId, moveIOGroup, path]
  );

  const addHandler = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      addIOGroup(path, afterId, uuidv4());
    },
    [path, afterId]
  );

  return (
    <DropArea accepts={DDF_IO_GROUP} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> Handler IO Group
      </NoWrap>
    </DropArea>
  );
}
