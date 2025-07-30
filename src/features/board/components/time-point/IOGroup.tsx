import FlexLayout from "@/components/FlexLayout.tsx";
import type { NodeIOGroup } from "../../types.ts";
import styles from "./TimePoint.module.css";
import Selectable from "../Selectable.tsx";
import IOGroupInput from "./IOGroupInput.tsx";
import IOGroupOutputs from "./IOGroupOutputs.tsx";

export interface IOGroupProps {
  group: NodeIOGroup;
}

export default function IOGroup(props: IOGroupProps) {
  const { id, input, outputs } = props.group;

  return (
    <Selectable id={id}>
      <FlexLayout isDraggable isHorizontal className={styles.ioGroup}>
        <IOGroupInput groupId={id} nodeInst={input} />
        <IOGroupOutputs groupId={id} outputs={outputs} />
      </FlexLayout>
    </Selectable>
  );
}
