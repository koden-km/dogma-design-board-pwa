import { Fragment } from "react";
import FlexLayout from "@/components/FlexLayout.tsx";
import { type Id, type NodeInst } from "../../types.ts";
import IOGroupOutput from "./IOGroupOutput.tsx";
import OperatorOutputDropArea from "../drop-area/OperatorOutputDropArea.tsx";

export interface IOGroupOutputsProps {
  groupId: Id;
  outputs: NodeInst[];
}

export default function IOGroupOutputs(props: IOGroupOutputsProps) {
  const { groupId, outputs } = props;

  return (
    <FlexLayout isVertical>
      <OperatorOutputDropArea groupId={groupId} afterId={undefined} />

      {Object.values(outputs).map((nodeInst) => (
        <Fragment key={nodeInst.id}>
          <IOGroupOutput groupId={groupId} nodeInst={nodeInst} />

          <OperatorOutputDropArea groupId={groupId} afterId={nodeInst.id} />
        </Fragment>
      ))}
    </FlexLayout>
  );
}
