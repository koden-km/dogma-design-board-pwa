import FlexLayout from "@/components/FlexLayout.tsx";
import type { NodeInst, NodeIOGroupPath } from "../../types.ts";
import NodeCard from "../NodeCard.tsx";
import OperatorInputDropArea from "../drop-area/OperatorInputDropArea.tsx";

export interface IOGroupInputProps {
  path: NodeIOGroupPath;
  nodeInst?: NodeInst;
}

export default function IOGroupInput(props: IOGroupInputProps) {
  const { path, nodeInst } = props;

  return (
    <FlexLayout isVertical>
      {nodeInst && <NodeCard path={path} nodeInst={nodeInst} />}
      {!nodeInst && <OperatorInputDropArea path={path} />}
    </FlexLayout>
  );
}
