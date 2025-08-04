import { useCallback } from "react";
import NoWrap from "@/components/NoWrap.tsx";
import {
  DDF_IO_GROUP,
  type DragNodeIOGroupPayload,
  type DragPayload,
  type Id,
  type TimePointPath,
} from "../../types.ts";
import DropArea from "./DropArea.tsx";
import AddButton from "./AddButton.tsx";

export interface OperatorIOGroupDropAreaProps {
  path: TimePointPath;
  afterId: Id | undefined; // first in list if undefined
}

export default function OperatorIOGroupDropArea(
  props: OperatorIOGroupDropAreaProps
) {
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
