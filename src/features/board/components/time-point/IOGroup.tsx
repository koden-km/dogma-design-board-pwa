import FlexLayout from "@/components/FlexLayout.tsx";
import type { IOGroup, OperatorGroupPath } from "../../types.ts";
import styles from "./TimePoint.module.css";
import Selectable from "../Selectable.tsx";
import IOGroupInput from "./IOGroupInput.tsx";
import IOGroupOutputs from "./IOGroupOutputs.tsx";
import { useIOGroupPath } from "../../path-hooks.ts";

export interface IOGroupProps {
  path: OperatorGroupPath;
  group: IOGroup;
}

export default function IOGroup(props: IOGroupProps) {
  const { id, input, outputs } = props.group;
  const path = useIOGroupPath(props.path, id);

  return (
    <Selectable id={id}>
      <FlexLayout isDraggable isHorizontal className={styles.ioGroup}>
        <IOGroupInput path={path} nodeInst={input} />
        <IOGroupOutputs path={path} outputs={outputs} />
      </FlexLayout>
    </Selectable>
  );
}
