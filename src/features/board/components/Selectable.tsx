import classnames from "classnames";
import { useIsSelected, useSelectId } from "../hooks.ts";
import type { Id } from "../types.ts";
import styles from "../Board.module.css";

export interface SelectableProps {
  children?: React.ReactNode;
  id: Id;
}

export default function Selectable(props: SelectableProps) {
  const { children, id } = props;
  const isSelected = useIsSelected(id);
  const select = useSelectId(id);
  const unselect = useSelectId("");

  const handleClick = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSelected) {
      unselect();
    } else {
      select();
    }
  };

  return (
    <div>
      <span id={id} />

      <div
        role="button"
        className={classnames(styles.selectable, {
          [styles.selectableIsSelected]: isSelected,
        })}
        onClick={handleClick}
      >
        {children}
      </div>

      {/* {isSelected && (
        <div className={styles.selectableOptions}>
          <button type="button">Remove</button>
        </div>
      )} */}
    </div>
  );
}
