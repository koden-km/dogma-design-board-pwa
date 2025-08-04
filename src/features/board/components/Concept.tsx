import { useCallback, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import { DDF_CONCEPT, type Concept, type TimelinePath } from "../types.ts";
import styles from "../Board.module.css";
import { useConceptPath } from "../path-hooks.ts";
import { packDnDConcept } from "../util.ts";
import TimePointDropArea from "./drop-area/TimePointDropArea.tsx";
import Draggable from "./Draggable.tsx";
import TimePoint from "./TimePoint.tsx";
import Selectable from "./Selectable.tsx";

export interface ConceptProps {
  path: TimelinePath;
  concept: Concept;
}

export default function Concept(props: ConceptProps) {
  const { id, name, comment, timePoints } = props.concept;
  const timelinePath = props.path;
  const path = useConceptPath(timelinePath, id);
  const [isVisible, setIsVisible] = useState(true);

  const handleDragStart = useCallback(
    (e: DragEvent) => {
      if (e.dataTransfer) {
        e.dataTransfer.setData(DDF_CONCEPT, packDnDConcept(timelinePath, id));
        e.dataTransfer.effectAllowed = "move";
      }
    },
    [id, timelinePath]
  );

  const handleVisibleToggle = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  return (
    <Draggable onDragStart={handleDragStart}>
      <Selectable id={id}>
        <div draggable className={styles.concept}>
          <div className={styles.header}>
            <h2>{name}</h2>
            <div className={styles.headerComment}>{comment}</div>

            <FlexLayout isHorizontal>
              <button type="button" onClick={handleVisibleToggle}>
                {isVisible ? "Hide Concept" : "Show Concept"}
              </button>

              {isVisible && (
                <button type="button" disabled>
                  Remove Concept
                </button>
              )}
            </FlexLayout>
          </div>

          {isVisible && (
            <FlexLayout isHorizontal>
              <TimePointDropArea path={path} afterId={undefined} />

              {timePoints.map((timePoint) => (
                <Fragment key={timePoint.id}>
                  <TimePoint path={path} timePoint={timePoint} />

                  <TimePointDropArea path={path} afterId={timePoint.id} />
                </Fragment>
              ))}
            </FlexLayout>
          )}
        </div>
      </Selectable>
    </Draggable>
  );
}
