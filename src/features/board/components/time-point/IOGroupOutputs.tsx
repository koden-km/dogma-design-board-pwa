import FlexLayout from "@/components/FlexLayout.tsx";
import type { NodeInst } from "../../types.ts";
import boardStyles from "../../Board.module.css";
import IOGroupOutput from "./IOGroupOutput.tsx";

export interface IOGroupOutputsProps {
  outputs: NodeInst[];
}

export default function IOGroupOutputs(props: IOGroupOutputsProps) {
  const { outputs } = props;

  return (
    <FlexLayout isVertical>
      <div className={boardStyles.addNew}>
        <button type="button">Add Operator Output</button>
      </div>

      {Object.values(outputs).map((nodeInst) => (
        <IOGroupOutput key={nodeInst.id} nodeInst={nodeInst} />
      ))}
    </FlexLayout>
  );
}
