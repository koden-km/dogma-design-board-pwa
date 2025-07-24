import FlexLayout from "@/components/FlexLayout.tsx";
import type { Timeline } from "../types.ts";
import Concept from "./Concept.tsx";

export interface TimelineProps {
  timeline: Timeline;
}

export default function Timeline(props: TimelineProps) {
  const { timeline } = props;

  return (
    <FlexLayout isHorizontal>
      {timeline.concepts.map((concept) => (
        <Concept key={concept.id} concept={concept} />
      ))}
    </FlexLayout>
  );
}
