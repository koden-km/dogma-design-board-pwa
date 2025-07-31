import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import type { NodeOperatorGroup } from "../../types.ts";
import NodeCard from "../NodeCard.tsx";
import styles from "./TimePoint.module.css";
import IOGroup from "./IOGroup.tsx";
import Selectable from "../Selectable.tsx";
import OperatorDropArea from "../drop-area/OperatorDropArea.tsx";
import OperatorIOGroupDropArea from "../drop-area/OperatorIOGroupDropArea.tsx";

export interface OperatorGroupProps {
  group: NodeOperatorGroup;
}

export default function OperatorGroup(props: OperatorGroupProps) {
  const { id, operatorNode, ioNodeGroups } = props.group;

  return (
    <Selectable id={id}>
      <FlexLayout isDraggable isVertical className={styles.operatorGroup}>
        <div>
          {operatorNode && <NodeCard nodeInst={operatorNode} />}
          {!operatorNode && <OperatorDropArea groupId={id} />}
        </div>

        <OperatorIOGroupDropArea groupId={id} afterId={undefined} />

        {ioNodeGroups.map((ioGroup) => (
          <Fragment key={ioGroup.id}>
            <IOGroup group={ioGroup} />
            <OperatorIOGroupDropArea groupId={id} afterId={ioGroup.id} />
          </Fragment>
        ))}
      </FlexLayout>
    </Selectable>
  );
}
