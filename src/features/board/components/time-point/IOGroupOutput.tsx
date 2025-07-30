import { Fragment } from "react/jsx-runtime";
import type { NodeInst } from "../../types.ts";
import boardStyles from "../../Board.module.css";
import NodeCard from "../NodeCard.tsx";

export interface IOGroupOutputProps {
  nodeInst: NodeInst;
}

export default function IOGroupOutput(props: IOGroupOutputProps) {
  const { nodeInst } = props;

  return (
    <Fragment key={nodeInst.id}>
      {/* <div>
        <button type="button">Remove Operator Output</button>
      </div> */}

      <NodeCard nodeInst={nodeInst} />

      <div className={boardStyles.addNew}>
        <button type="button">Add Operator Output</button>
      </div>
    </Fragment>
  );
}
