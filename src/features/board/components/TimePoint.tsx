import FlexLayout from "@/components/FlexLayout.tsx";
import type { TimePoint } from "../types.ts";
import NodeCard from "./NodeCard.tsx";

export interface TimePointProps {
  timePoint: TimePoint;
}

export default function TimePoint(props: TimePointProps) {
  const { timePoint } = props;
  const { operatorGroups } = timePoint;

  return (
    <FlexLayout isVertical>
      <code>TimePoint:{timePoint.id}</code>

      {operatorGroups.map(({ id: groupId, operatorNode, ioNodeGroups }) => {
        return (
          <FlexLayout key={groupId} isVertical>
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
      })}
    </FlexLayout>
  );
}
