import { useCallback, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import {
  type Timeline,
  type DomainPath,
  DDF_TIMELINE,
  type Id,
} from "../types.ts";
import { packDnDTimeline } from "../util.ts";
import styles from "../Board.module.css";
import ConceptDropArea from "./drop-area/ConceptDropArea.tsx";
import { useTimelinePath } from "../path-hooks.ts";
import Concept from "./Concept.tsx";
import Selectable from "./Selectable.tsx";
import Draggable from "./Draggable.tsx";

export interface TimelineProps {
  path: DomainPath; // TODO(KM): Try Delete
  domainId: Id;
  timeline: Timeline;
}

export default function Timeline(props: TimelineProps) {
  // const {domainId, timeline} = props
  const { domainId } = props;
  // const { id, concepts } = props.timeline;
  const { id, concepts } = props.timeline;
  const domainPath = props.path;
  const path = useTimelinePath(domainPath, id);
  const [isVisible, setIsVisible] = useState(true);

  const handleDragStart = useCallback(
    (e: DragEvent) => {
      if (e.dataTransfer) {
        e.stopPropagation();
        // e.dataTransfer.setData(DDF_TIMELINE, packDnDTimeline(domainPath, id));
        e.dataTransfer.setData(
          DDF_TIMELINE,
          // TODO(KM): Also flatten and remove path?
          // packDnDTimeline(domainPath.domainId, id)
          packDnDTimeline(domainId, id)
        );
        e.dataTransfer.effectAllowed = "move";
      }
    },
    // [domainPath, id]
    [domainId, id]
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
            <p>DEBUG(KM): Timeline {id}</p>
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
                  <Concept path={path} timelineId={id} concept={concept} />

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
