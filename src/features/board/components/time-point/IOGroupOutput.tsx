import { type Id, type NodeInst } from "../../types.ts";
import NodeCard from "../NodeCard.tsx";

export interface IOGroupOutputProps {
  groupId: Id;
  nodeInst: NodeInst;
}

export default function IOGroupOutput(props: IOGroupOutputProps) {
  const { nodeInst } = props;

  return (
    <>
      {/* <div>
        <button type="button">Remove Operator Output</button>
      </div> */}

      <NodeCard nodeInst={nodeInst} />
    </>
  );
}
