import { useCallback } from "react";
import FlexLayout from "@/components/FlexLayout.tsx";
import {
  DDF_IO_GROUP,
  type IOGroup,
  type OperatorGroupPath,
} from "../../types.ts";
import { useIOGroupPath } from "../../path-hooks.ts";
import { packDnDIOGroup } from "../../util.ts";
import Draggable from "../Draggable.tsx";
import styles from "./TimePoint.module.css";
import Selectable from "../Selectable.tsx";
import IOGroupInput from "./IOGroupInput.tsx";
import IOGroupOutputs from "./IOGroupOutputs.tsx";

export interface IOGroupProps {
  path: OperatorGroupPath;
  group: IOGroup;
}

export default function IOGroup(props: IOGroupProps) {
  const { id, input, outputs } = props.group;
  const opGroupPath = props.path;
  const path = useIOGroupPath(opGroupPath, id);

  const handleDragStart = useCallback(
    (e: DragEvent) => {
      if (e.dataTransfer) {
        e.stopPropagation();
        e.dataTransfer.setData(DDF_IO_GROUP, packDnDIOGroup(opGroupPath, id));
        e.dataTransfer.effectAllowed = "move";
      }
    },
    [id, opGroupPath]
  );

  return (
    <Draggable onDragStart={handleDragStart}>
      <Selectable id={id}>
        <FlexLayout isHorizontal className={styles.ioGroup}>
          <IOGroupInput path={path} nodeInst={input} />
          <IOGroupOutputs path={path} outputs={outputs} />
        </FlexLayout>
      </Selectable>
    </Draggable>
  );
}
