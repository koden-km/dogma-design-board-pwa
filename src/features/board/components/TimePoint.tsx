import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import type { TimePoint } from "../types.ts";
import styles from "../Board.module.css";
import OperatorGroup from "./time-point/OperatorGroup.tsx";
import Selectable from "./Selectable.tsx";

export interface TimePointProps {
  timePoint: TimePoint;
}

export default function TimePoint(props: TimePointProps) {
  const { id, operatorGroups } = props.timePoint;

  return (
    <Selectable id={id}>
      <FlexLayout isVertical className={styles.timePoint}>
        <div className={styles.header}>
          {/* <div><code>TimePoint:{id}</code></div> */}
          <button type="button">Remove Time Point</button>
        </div>

        <div className={styles.addNew}>
          <button type="button">Add Operator Group</button>
        </div>

        {operatorGroups.map((group) => (
          <Fragment key={group.id}>
            <OperatorGroup group={group} />

            <div className={styles.addNew}>
              <button type="button">Add Operator Group</button>
            </div>
          </Fragment>
        ))}
      </FlexLayout>
    </Selectable>
  );
}
