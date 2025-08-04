import FlexLayout from "@/components/FlexLayout.tsx";
import type { NodeInst, IOGroupPath } from "../../types.ts";
import NodeCard from "../NodeCard.tsx";
import IOGroupInputDropArea from "../drop-area/IOGroupInputDropArea.tsx";

export interface IOGroupInputProps {
  path: IOGroupPath;
  nodeInst?: NodeInst;
}

export default function IOGroupInput(props: IOGroupInputProps) {
  const { path, nodeInst } = props;

  return (
    <FlexLayout isVertical>
      {nodeInst && <NodeCard path={path} nodeInst={nodeInst} />}
      {!nodeInst && <IOGroupInputDropArea path={path} />}
    </FlexLayout>
  );
}
