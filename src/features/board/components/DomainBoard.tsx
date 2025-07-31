import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import type { Domain } from "../types.ts";
import styles from "../Board.module.css";
import Timeline from "./Timeline.tsx";
import TimelineDropArea from "./drop-area/TimelineDropArea.tsx";

export interface DomainBoardProps {
  domain: Domain;
}

export default function DomainBoard(props: DomainBoardProps) {
  const { id, comment, name, timelines } = props.domain;

  return (
    <div>
      <div className={styles.header}>
        <h2>{name}</h2>
        <div className={styles.headerComment}>{comment}</div>

        <button type="button" disabled>
          Remove Domain
        </button>
      </div>

      <FlexLayout isVertical>
        <TimelineDropArea domainId={id} afterId={undefined} />

        {timelines.map((timeline) => (
          <Fragment key={timeline.id}>
            <Timeline timeline={timeline} />

            <TimelineDropArea domainId={id} afterId={timeline.id} />
          </Fragment>
        ))}
      </FlexLayout>
    </div>
  );
}
