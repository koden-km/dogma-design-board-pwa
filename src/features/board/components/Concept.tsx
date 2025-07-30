import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import type { Concept } from "../types.ts";
import styles from "../Board.module.css";
import TimePoint from "./TimePoint.tsx";
import Selectable from "./Selectable.tsx";

export interface ConceptProps {
  concept: Concept;
}

export default function Concept(props: ConceptProps) {
  const { id, name, comment, timePoints } = props.concept;

  return (
    <Selectable id={id}>
      <div draggable className={styles.concept}>
        <div className={styles.header}>
          <h2>{name}</h2>
          <div className={styles.conceptComment}>{comment}</div>
          <button type="button">Remove Concept</button>
        </div>

        <FlexLayout isHorizontal>
          <div className={styles.dropArea}>
            <button type="button">Add Time Point</button>
          </div>

          {timePoints.map((timePoint) => (
            <Fragment key={timePoint.id}>
              <TimePoint timePoint={timePoint} />

              <div className={styles.dropArea}>
                <button type="button">Add Time Point</button>
              </div>
            </Fragment>
          ))}
        </FlexLayout>
      </div>
    </Selectable>
  );
}
