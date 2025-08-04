import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import type { Concept, TimelinePath } from "../types.ts";
import styles from "../Board.module.css";
import TimePoint from "./TimePoint.tsx";
import Selectable from "./Selectable.tsx";
import TimePointDropArea from "./drop-area/TimePointDropArea.tsx";
import { useConceptPath } from "../path-hooks.ts";

export interface ConceptProps {
  path: TimelinePath;
  concept: Concept;
}

export default function Concept(props: ConceptProps) {
  const { id, name, comment, timePoints } = props.concept;
  const path = useConceptPath(props.path, id);
  const [isVisible, setIsVisible] = useState(true);

  const handleVisibleToggle = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  return (
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
  );
}
