import FlexLayout from "@/components/FlexLayout.tsx";
import type { TimePoint } from "../types.ts";
import NodeCard from "./NodeCard.tsx";

export interface TimePointProps {
  timePoint: TimePoint;
}

export default function TimePoint(props: TimePointProps) {
  const { timePoint } = props;

  const {
    operatorNode, // operator node (aggregate, process, integration, projection, view)
    ioNodeGroups, // groups of input nodes and all the outputs those can produce. message nodes (command, event, timeout) in this time point (think vertical time slice)
  } = timePoint;

  return (
    <FlexLayout isVertical>
      <code>TimePoint:{timePoint.id}</code>

      <div>
        {operatorNode !== undefined ? (
          <NodeCard nodeInst={operatorNode} />
        ) : (
          "(no operator)"
        )}
      </div>

      {ioNodeGroups.map(({ id, input, outputs }) => {
        return (
          <FlexLayout key={id} isHorizontal>
            <FlexLayout isVertical>
              {input && <NodeCard nodeInst={input} />}
            </FlexLayout>

            <FlexLayout isVertical>
              {Object.values(outputs).map((nodeInst) => (
                <NodeCard key={nodeInst.id} nodeInst={nodeInst} />
              ))}
            </FlexLayout>
          </FlexLayout>
        );
      })}
    </FlexLayout>
  );
}
