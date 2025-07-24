import FlexLayout from "@/components/FlexLayout.tsx";
import type { Concept } from "../types.ts";
import TimePoint from "./TimePoint.tsx";

export interface ConceptProps {
  concept: Concept;
}

export default function Concept(props: ConceptProps) {
  const { name, comment, timePoints } = props.concept;

  return (
    <div>
      <h2>{name}</h2>
      <p>{comment}</p>

      <FlexLayout isHorizontal>
        {timePoints.map((timePoint) => (
          <TimePoint key={timePoint.id} timePoint={timePoint} />
        ))}
      </FlexLayout>
    </div>
  );
}
