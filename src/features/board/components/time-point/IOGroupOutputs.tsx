import classnames from "classnames";
import { Fragment, useEffect, useRef, useState } from "react";
import FlexLayout from "@/components/FlexLayout.tsx";
import { DDF_NODE_X, type Id, type NodeInst } from "../../types.ts";
import boardStyles from "../../Board.module.css";
import IOGroupOutput from "./IOGroupOutput.tsx";
import { unpackDnDNodeInst } from "../../util.ts";

export interface IOGroupOutputsProps {
  groupId: Id;
  outputs: NodeInst[];
}

export default function IOGroupOutputs(props: IOGroupOutputsProps) {
  const { groupId, outputs } = props;
  const [acceptsDroppable, setAcceptsDroppable] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elRef = ref.current;

    const dragEnterHandler = () => {
      setAcceptsDroppable(true);
    };

    const dragLeaveHandler = () => {
      setAcceptsDroppable(false);
    };

    const dragEndHandler = () => {
      setAcceptsDroppable(false);
    };

    const dragOverHandler = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer) {
        if (e.dataTransfer.types.includes(DDF_NODE_X)) {
          // Supported type
          e.dataTransfer.dropEffect = "move";
        } else {
          // Unsupported type
          e.dataTransfer.dropEffect = "none";
        }
      }
    };

    const dropHandler = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer) {
        const jsonData = e.dataTransfer.getData(DDF_NODE_X);
        if (jsonData) {
          const data = unpackDnDNodeInst(jsonData);
          // TODO(KM): Dispatch an action to move this node from old location to this location.
          console.log("DEBUG(KM): TODO handle dropped data=", data);
          setAcceptsDroppable(false);
        }
      }
    };

    elRef.addEventListener("dragend", dragEndHandler);
    elRef.addEventListener("dragenter", dragEnterHandler);
    elRef.addEventListener("dragleave", dragLeaveHandler);
    elRef.addEventListener("dragover", dragOverHandler);
    elRef.addEventListener("drop", dropHandler);

    return () => {
      elRef.removeEventListener("dragend", dragEndHandler);
      elRef.removeEventListener("dragenter", dragEnterHandler);
      elRef.removeEventListener("dragleave", dragLeaveHandler);
      elRef.removeEventListener("dragover", dragOverHandler);
      elRef.removeEventListener("drop", dropHandler);
    };
  }, [ref]);

  return (
    <FlexLayout isVertical>
      <div
        ref={ref}
        className={classnames(boardStyles.dropArea, {
          [boardStyles.dropAccepted]: acceptsDroppable,
        })}
      >
        {/* <button type="button">Add Operator Output (DROP HERE!)</button> */}
        Add Operator Output (TEST DROP HERE!)
      </div>

      {Object.values(outputs).map((nodeInst) => (
        <Fragment key={nodeInst.id}>
          <IOGroupOutput groupId={groupId} nodeInst={nodeInst} />

          <div className={boardStyles.dropArea}>
            <button type="button">Add Operator Output</button>
          </div>
        </Fragment>
      ))}
    </FlexLayout>
  );
}
