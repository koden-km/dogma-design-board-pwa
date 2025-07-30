import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import type { Domain } from "../types.ts";
import styles from "../Board.module.css";
import Timeline from "./Timeline.tsx";

export interface DomainBoardProps {
  domain: Domain;
}

export default function DomainBoard(props: DomainBoardProps) {
  const { domain } = props;

  return (
    <div>
      <h1>{domain.name}</h1>

      <FlexLayout isVertical>
        <div className={styles.dropArea}>
          <button type="button">Add Timeline</button>
        </div>

        {domain.timelines.map((timeline) => (
          <Fragment key={timeline.id}>
            <Timeline timeline={timeline} />

            <div className={styles.dropArea}>
              <button type="button">Add Timeline</button>
            </div>
          </Fragment>
        ))}
      </FlexLayout>
    </div>
  );
}
