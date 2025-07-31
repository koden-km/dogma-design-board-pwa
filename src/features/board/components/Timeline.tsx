import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import type { Timeline } from "../types.ts";
import styles from "../Board.module.css";
import Concept from "./Concept.tsx";
import Selectable from "./Selectable.tsx";
import ConceptDropArea from "./drop-area/ConceptDropArea.tsx";

export interface TimelineProps {
  timeline: Timeline;
}

export default function Timeline(props: TimelineProps) {
  const { id, concepts } = props.timeline;
  const [isVisible, setIsVisible] = useState(true);

  const handleVisibleToggle = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  return (
    <Selectable id={id}>
      <FlexLayout isDraggable isVertical className={styles.timeline}>
        <div className={styles.header}>
          {/* <div><code>Timeline:{id}</code></div> */}
          <FlexLayout isHorizontal>
            <button type="button" onClick={handleVisibleToggle}>
              {isVisible ? "Hide Timeline" : "Show Timeline"}
            </button>

            {isVisible && (
              <button type="button" disabled>
                Remove Timeline
              </button>
            )}
          </FlexLayout>
        </div>

        {isVisible && (
          <FlexLayout isHorizontal>
            <ConceptDropArea timelineId={id} afterId={undefined} />

            {concepts.map((concept) => (
              <Fragment key={concept.id}>
                <Concept concept={concept} />

                <ConceptDropArea timelineId={id} afterId={concept.id} />
              </Fragment>
            ))}
          </FlexLayout>
        )}
      </FlexLayout>
    </Selectable>
  );
}
