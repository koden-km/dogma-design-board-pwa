import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import { DDF_TIME_POINT, type ConceptPath, type TimePoint } from "../types.ts";
import styles from "../Board.module.css";
import Selectable from "./Selectable.tsx";
import OperatorGroup from "./time-point/OperatorGroup.tsx";
import OperatorGroupDropArea from "./drop-area/OperatorGroupDropArea.tsx";
import { useTimePointPath } from "../path-hooks.ts";
import Draggable from "./Draggable.tsx";
import { useCallback } from "react";
import { packDnDTimePoint } from "../util.ts";

export interface TimePointProps {
  path: ConceptPath;
  timePoint: TimePoint;
}

export default function TimePoint(props: TimePointProps) {
  const { id, operatorGroups } = props.timePoint;
  const conceptPath = props.path;
  const path = useTimePointPath(conceptPath, id);

  const handleDragStart = useCallback(
    (e: DragEvent) => {
      if (e.dataTransfer) {
        e.dataTransfer.setData(
          DDF_TIME_POINT,
          packDnDTimePoint(conceptPath, id)
        );
        e.dataTransfer.effectAllowed = "move";
      }
    },
    [conceptPath, id]
  );

  return (
    <Draggable onDragStart={handleDragStart}>
      <Selectable id={id}>
        <FlexLayout isVertical className={styles.timePoint}>
          <div className={styles.header}>
            {/* <div><code>TimePoint:{id}</code></div> */}
            <button type="button" disabled>
              Remove Time Point
            </button>
          </div>

          <OperatorGroupDropArea path={path} afterId={undefined} />

          {operatorGroups.map((opGroup) => (
            <Fragment key={opGroup.id}>
              <OperatorGroup path={path} group={opGroup} />

              <OperatorGroupDropArea path={path} afterId={opGroup.id} />
            </Fragment>
          ))}
        </FlexLayout>
      </Selectable>
    </Draggable>
  );
}
