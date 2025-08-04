import { useCallback } from "react";
import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import {
  DDF_OP_GROUP,
  type OperatorGroup,
  type TimePointPath,
} from "../../types.ts";
import { useOperatorGroupPath } from "../../path-hooks.ts";
import { packDnDOperatorGroup } from "../../util.ts";
import Draggable from "../Draggable.tsx";
import NodeCard from "../NodeCard.tsx";
import Selectable from "../Selectable.tsx";
import OperatorNodeDropArea from "../drop-area/OperatorNodeDropArea.tsx";
import IOGroupDropArea from "../drop-area/IOGroupDropArea.tsx";
import styles from "./TimePoint.module.css";
import IOGroup from "./IOGroup.tsx";

export interface OperatorGroupProps {
  path: TimePointPath;
  group: OperatorGroup;
}

export default function OperatorGroup(props: OperatorGroupProps) {
  const { id, operatorNode, ioGroups } = props.group;
  const tpPath = props.path;
  const path = useOperatorGroupPath(tpPath, id);

  const handleDragStart = useCallback(
    (e: DragEvent) => {
      if (e.dataTransfer) {
        e.stopPropagation();
        e.dataTransfer.setData(DDF_OP_GROUP, packDnDOperatorGroup(tpPath, id));
        e.dataTransfer.effectAllowed = "move";
      }
    },
    [id, tpPath]
  );

  return (
    <Draggable onDragStart={handleDragStart}>
      <Selectable id={id}>
        <FlexLayout isVertical className={styles.operatorGroup}>
          <div>
            {operatorNode && <NodeCard path={path} nodeInst={operatorNode} />}
            {!operatorNode && <OperatorNodeDropArea path={path} />}
          </div>

          <IOGroupDropArea path={path} afterId={undefined} />

          {ioGroups.map((ioGroup) => (
            <Fragment key={ioGroup.id}>
              <IOGroup path={path} group={ioGroup} />
              <IOGroupDropArea path={path} afterId={ioGroup.id} />
            </Fragment>
          ))}
        </FlexLayout>
      </Selectable>
    </Draggable>
  );
}
