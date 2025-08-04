import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import type { ConceptPath, TimePoint } from "../types.ts";
import styles from "../Board.module.css";
import Selectable from "./Selectable.tsx";
import OperatorGroup from "./time-point/OperatorGroup.tsx";
import OperatorGroupDropArea from "./drop-area/OperatorGroupDropArea.tsx";
import { useTimePointPath } from "../path-hooks.ts";

export interface TimePointProps {
  path: ConceptPath;
  timePoint: TimePoint;
}

export default function TimePoint(props: TimePointProps) {
  const { id, operatorGroups } = props.timePoint;
  const path = useTimePointPath(props.path, id);

  return (
    <Selectable id={id}>
      <FlexLayout isDraggable isVertical className={styles.timePoint}>
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
  );
}
