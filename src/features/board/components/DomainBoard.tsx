import FlexLayout from "@/components/FlexLayout.tsx";
import type { Domain } from "../types.ts";
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
        {domain.timelines.map((timeline) => (
          <Timeline key={timeline.id} timeline={timeline} />
        ))}
      </FlexLayout>
    </div>
  );
}
