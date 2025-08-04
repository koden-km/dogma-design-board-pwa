import { useCallback, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import { type Timeline, type DomainPath, DDF_TIMELINE } from "../types.ts";
import styles from "../Board.module.css";
import ConceptDropArea from "./drop-area/ConceptDropArea.tsx";
import { useTimelinePath } from "../path-hooks.ts";
import Concept from "./Concept.tsx";
import Selectable from "./Selectable.tsx";
import { packDnDTimeline } from "../util.ts";
import Draggable from "./Draggable.tsx";

export interface TimelineProps {
  path: DomainPath;
  timeline: Timeline;
}

export default function Timeline(props: TimelineProps) {
  const { id, concepts } = props.timeline;
  const domainPath = props.path;
  const path = useTimelinePath(domainPath, id);
  const [isVisible, setIsVisible] = useState(true);

  const handleDragStart = useCallback(
    (e: DragEvent) => {
      if (e.dataTransfer) {
        e.dataTransfer.setData(DDF_TIMELINE, packDnDTimeline(domainPath, id));
        e.dataTransfer.effectAllowed = "move";
      }
    },
    [domainPath, id]
  );

  const handleVisibleToggle = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  return (
    <Draggable onDragStart={handleDragStart}>
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
              <ConceptDropArea path={path} afterId={undefined} />

              {concepts.map((concept) => (
                <Fragment key={concept.id}>
                  <Concept path={path} concept={concept} />

                  <ConceptDropArea path={path} afterId={concept.id} />
                </Fragment>
              ))}
            </FlexLayout>
          )}
        </FlexLayout>
      </Selectable>
    </Draggable>
  );
}
