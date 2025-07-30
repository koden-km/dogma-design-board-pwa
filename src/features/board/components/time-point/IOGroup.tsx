import { Fragment } from "react/jsx-runtime";
import FlexLayout from "@/components/FlexLayout.tsx";
import type { NodeIOGroup } from "../../types.ts";
import boardStyles from "../../Board.module.css";
import NodeCard from "../NodeCard.tsx";
import styles from "./TimePoint.module.css";
import Selectable from "../Selectable.tsx";

export interface IOGroupProps {
  group: NodeIOGroup;
}

export default function IOGroup(props: IOGroupProps) {
  const { id, input, outputs } = props.group;

  return (
    <Selectable id={id}>
      <FlexLayout isHorizontal className={styles.ioGroup}>
        <FlexLayout isVertical>
          {input && (
            <>
              {/* <div>
                <button type="button">Remove Operator Input</button>
              </div> */}
              <NodeCard nodeInst={input} />
            </>
          )}

          {!input && (
            <div className={boardStyles.addNew}>
              <button type="button">Add Operator Input</button>
            </div>
          )}
        </FlexLayout>

        <FlexLayout isVertical>
          <div className={boardStyles.addNew}>
            <button type="button">Add Operator Output</button>
          </div>

          {Object.values(outputs).map((nodeInst) => (
            <Fragment key={nodeInst.id}>
              {/* <div>
                <button type="button">Remove Operator Output</button>
              </div> */}

              <NodeCard nodeInst={nodeInst} />

              <div className={boardStyles.addNew}>
                <button type="button">Add Operator Output</button>
              </div>
            </Fragment>
          ))}
        </FlexLayout>
      </FlexLayout>
    </Selectable>
  );
}
