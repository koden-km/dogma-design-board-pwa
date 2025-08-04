import { Fragment } from "react";
import FlexLayout from "@/components/FlexLayout.tsx";
import { type NodeInst, type NodeIOGroupPath } from "../../types.ts";
import IOGroupOutput from "./IOGroupOutput.tsx";
import OperatorOutputDropArea from "../drop-area/OperatorOutputDropArea.tsx";

export interface IOGroupOutputsProps {
  path: NodeIOGroupPath;
  outputs: NodeInst[];
}

export default function IOGroupOutputs(props: IOGroupOutputsProps) {
  const { path, outputs } = props;

  return (
    <FlexLayout isVertical>
      <OperatorOutputDropArea path={path} afterId={undefined} />

      {Object.values(outputs).map((nodeInst) => (
        <Fragment key={nodeInst.id}>
          <IOGroupOutput path={path} nodeInst={nodeInst} />

          <OperatorOutputDropArea path={path} afterId={nodeInst.id} />
        </Fragment>
      ))}
    </FlexLayout>
  );
}
