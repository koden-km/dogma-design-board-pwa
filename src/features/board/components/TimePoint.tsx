import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import type { TimePoint } from "../types.ts";
import styles from "../Board.module.css";
import OperatorGroup from "./time-point/OperatorGroup.tsx";
import Selectable from "./Selectable.tsx";
import TimePointOperatorGroupDropArea from "./drop-area/TimePointOperatorGroupDropArea.tsx";

export interface TimePointProps {
  timePoint: TimePoint;
}

export default function TimePoint(props: TimePointProps) {
  const { id, operatorGroups } = props.timePoint;

  return (
    <Selectable id={id}>
      <FlexLayout isDraggable isVertical className={styles.timePoint}>
        <div className={styles.header}>
          {/* <div><code>TimePoint:{id}</code></div> */}
          <button type="button" disabled>
            Remove Time Point
          </button>
        </div>

        <TimePointOperatorGroupDropArea timePointId={id} afterId={undefined} />

        {operatorGroups.map((opGroup) => (
          <Fragment key={opGroup.id}>
            <OperatorGroup group={opGroup} />

            <TimePointOperatorGroupDropArea
              timePointId={id}
              afterId={opGroup.id}
            />
          </Fragment>
        ))}
      </FlexLayout>
    </Selectable>
  );
}
