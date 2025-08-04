import { type NodeInst, type IOGroupPath } from "../../types.ts";
import NodeCard from "../NodeCard.tsx";

export interface IOGroupOutputProps {
  path: IOGroupPath;
  nodeInst: NodeInst;
}

export default function IOGroupOutput(props: IOGroupOutputProps) {
  const { path, nodeInst } = props;

  return (
    <>
      {/* <div>
        <button type="button">Remove Operator Output</button>
      </div> */}

      <NodeCard path={path} nodeInst={nodeInst} />
    </>
  );
}
