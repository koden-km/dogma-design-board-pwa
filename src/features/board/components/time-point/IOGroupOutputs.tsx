import { Fragment } from "react";
import FlexLayout from "@/components/FlexLayout.tsx";
import { type NodeInst, type IOGroupPath } from "../../types.ts";
import IOGroupOutput from "./IOGroupOutput.tsx";
import IOGroupOutputDropArea from "../drop-area/IOGroupOutputDropArea.tsx";

export interface IOGroupOutputsProps {
  path: IOGroupPath;
  outputs: NodeInst[];
}

export default function IOGroupOutputs(props: IOGroupOutputsProps) {
  const { path, outputs } = props;

  return (
    <FlexLayout isVertical>
      <IOGroupOutputDropArea path={path} afterId={undefined} />

      {Object.values(outputs).map((nodeInst) => (
        <Fragment key={nodeInst.id}>
          <IOGroupOutput path={path} nodeInst={nodeInst} />

          <IOGroupOutputDropArea path={path} afterId={nodeInst.id} />
        </Fragment>
      ))}
    </FlexLayout>
  );
}
