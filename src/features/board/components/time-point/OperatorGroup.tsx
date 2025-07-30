import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import type { NodeOperatorGroup } from "../../types.ts";
import boardStyles from "../../Board.module.css";
import NodeCard from "../NodeCard.tsx";
import styles from "./TimePoint.module.css";
import IOGroup from "./IOGroup.tsx";
import Selectable from "../Selectable.tsx";

export interface OperatorGroupProps {
  group: NodeOperatorGroup;
}

export default function OperatorGroup(props: OperatorGroupProps) {
  const { id, operatorNode, ioNodeGroups } = props.group;

  return (
    <Selectable id={id}>
      <FlexLayout isDraggable isVertical className={styles.operatorGroup}>
        <div>
          {operatorNode && (
            <>
              {/* <div>
                <button type="button">Remove Operator</button>
              </div> */}
              <NodeCard nodeInst={operatorNode} />
            </>
          )}

          {!operatorNode && (
            <div className={boardStyles.addNew}>
              <button type="button">Add Operator</button>
            </div>
          )}
        </div>

        <div className={boardStyles.addNew}>
          <button type="button">Add Operator IO Group</button>
        </div>

        {ioNodeGroups.map((group) => (
          <Fragment key={group.id}>
            <IOGroup group={group} />

            <div className={boardStyles.addNew}>
              <button type="button">Add Operator IO Group</button>
            </div>
          </Fragment>
        ))}
      </FlexLayout>
    </Selectable>
  );
}
