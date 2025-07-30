import FlexLayout from "@/components/FlexLayout.tsx";
import type { Id, NodeInst } from "../../types.ts";
import boardStyles from "../../Board.module.css";
import NodeCard from "../NodeCard.tsx";

export interface IOGroupInputProps {
  groupId: Id;
  nodeInst?: NodeInst;
}

export default function IOGroupInput(props: IOGroupInputProps) {
  const { nodeInst } = props;

  return (
    <FlexLayout isVertical>
      {nodeInst && (
        <>
          {/* <div>
            <button type="button">Remove Operator Input</button>
          </div> */}
          <NodeCard nodeInst={nodeInst} />
        </>
      )}

      {!nodeInst && (
        <div className={boardStyles.dropArea}>
          <button type="button">Add Operator Input</button>
        </div>
      )}
    </FlexLayout>
  );
}
