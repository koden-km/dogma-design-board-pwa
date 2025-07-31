import classnames from "classnames";
import { useEffect, useRef, useState } from "react";
import styles from "../../Board.module.css";
import {
  DDF_CONCEPT,
  DDF_IO_GROUP,
  DDF_NODE_X,
  DDF_OP_GROUP,
  DDF_TIME_POINT,
  DDF_TIMELINE,
  type DragAndDropFormatType,
  type DragAndDropPayload,
} from "../../types.ts";
import {
  unpackDnDNodeInst,
  unpackDnDNodeIOConcept,
  unpackDnDNodeIOGroup,
  unpackDnDNodeIOTimeline,
  unpackDnDNodeIOTimePoint,
  unpackDnDNodeOperatorGroup,
} from "../../util.ts";

export interface DropAreaProps {
  children?: React.ReactNode;
  accepts: DragAndDropFormatType;
  onDrop: (data: DragAndDropPayload) => void;
}

export default function DropArea(props: DropAreaProps) {
  const { accepts, children, onDrop } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [acceptsDroppable, setAcceptsDroppable] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const dragEnterHandler = (e: DragEvent) => {
      if (e.dataTransfer?.types.includes(accepts)) {
        setAcceptsDroppable(true);
      }
    };

    const dragLeaveHandler = () => {
      setAcceptsDroppable(false);
    };

    const dragEndHandler = () => {
      setAcceptsDroppable(false);
    };

    const dragOverHandler = (e: DragEvent) => {
      e.preventDefault();
      if (!e.dataTransfer) return;
      if (e.dataTransfer.types.includes(accepts)) {
        // Supported type
        e.dataTransfer.dropEffect = "move";
      } else {
        // Unsupported type
        e.dataTransfer.dropEffect = "none";
      }
    };

    const dropHandler = (e: DragEvent) => {
      e.preventDefault();
      setAcceptsDroppable(false);
      if (!e.dataTransfer) return;
      const jsonData = e.dataTransfer.getData(accepts);
      if (jsonData) {
        switch (accepts) {
          case DDF_NODE_X:
            return onDrop(unpackDnDNodeInst(jsonData));
          case DDF_OP_GROUP:
            return onDrop(unpackDnDNodeOperatorGroup(jsonData));
          case DDF_IO_GROUP:
            return onDrop(unpackDnDNodeIOGroup(jsonData));
          case DDF_TIME_POINT:
            return onDrop(unpackDnDNodeIOTimePoint(jsonData));
          case DDF_CONCEPT:
            return onDrop(unpackDnDNodeIOConcept(jsonData));
          case DDF_TIMELINE:
            return onDrop(unpackDnDNodeIOTimeline(jsonData));
        }
      }
    };

    const elRef = ref.current;

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
  }, [accepts, onDrop, ref]);

  return (
    <div
      ref={ref}
      className={classnames(styles.dropArea, {
        [styles.dropAccepted]: acceptsDroppable,
      })}
    >
      {children}
    </div>
  );
}
