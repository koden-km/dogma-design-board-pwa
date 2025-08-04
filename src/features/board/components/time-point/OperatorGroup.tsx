import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import type { OperatorGroup, TimePointPath } from "../../types.ts";
import NodeCard from "../NodeCard.tsx";
import styles from "./TimePoint.module.css";
import IOGroup from "./IOGroup.tsx";
import Selectable from "../Selectable.tsx";
import OperatorDropArea from "../drop-area/OperatorDropArea.tsx";
import OperatorIOGroupDropArea from "../drop-area/OperatorIOGroupDropArea.tsx";
import { useOperatorGroupPath } from "../../path-hooks.ts";

export interface OperatorGroupProps {
  path: TimePointPath;
  group: OperatorGroup;
}

export default function OperatorGroup(props: OperatorGroupProps) {
  const { id, operatorNode, ioGroups } = props.group;
  const path = useOperatorGroupPath(props.path, id);

  return (
    <Selectable id={id}>
      <FlexLayout isDraggable isVertical className={styles.operatorGroup}>
        <div>
          {operatorNode && <NodeCard path={path} nodeInst={operatorNode} />}
          {!operatorNode && <OperatorDropArea path={path} />}
        </div>

        <OperatorIOGroupDropArea path={path} afterId={undefined} />

        {ioGroups.map((ioGroup) => (
          <Fragment key={ioGroup.id}>
            <IOGroup path={path} group={ioGroup} />
            <OperatorIOGroupDropArea path={path} afterId={ioGroup.id} />
          </Fragment>
        ))}
      </FlexLayout>
    </Selectable>
  );
}
