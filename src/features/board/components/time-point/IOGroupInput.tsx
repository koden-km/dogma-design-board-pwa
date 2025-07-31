import FlexLayout from "@/components/FlexLayout.tsx";
import type { Id, NodeInst } from "../../types.ts";
import NodeCard from "../NodeCard.tsx";
import OperatorInputDropArea from "../drop-area/OperatorInputDropArea.tsx";

export interface IOGroupInputProps {
  groupId: Id;
  nodeInst?: NodeInst;
}

export default function IOGroupInput(props: IOGroupInputProps) {
  const { groupId, nodeInst } = props;

  return (
    <FlexLayout isVertical>
      {nodeInst && <NodeCard nodeInst={nodeInst} />}
      {!nodeInst && <OperatorInputDropArea groupId={groupId} />}
    </FlexLayout>
  );
}
