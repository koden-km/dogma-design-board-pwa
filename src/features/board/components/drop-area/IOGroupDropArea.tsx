import { useCallback } from "react";
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
import { useMoveIOGroup } from "../../hooks.ts";

export interface IOGroupDropAreaProps {
  path: OperatorGroupPath;
  afterId: Id | undefined; // first in list if undefined
}

export default function IOGroupDropArea(props: IOGroupDropAreaProps) {
  const { path, afterId } = props;
  const moveIOGroup = useMoveIOGroup();

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
      console.log(`TODO: Add new io group afterId=${afterId}! path=`, path);
    },
    [path, afterId]
  );

  return (
    <DropArea accepts={DDF_IO_GROUP} onDrop={dropHandler}>
      <NoWrap>
        <AddButton onClick={addHandler} /> IO Group
      </NoWrap>
    </DropArea>
  );
}
