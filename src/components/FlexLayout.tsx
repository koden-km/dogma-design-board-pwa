import classnames from "classnames";
import styles from "./FlexLayout.module.css";

export interface FlexLayoutProps {
  children?: React.ReactNode;
  className?: string;
  isDraggable?: boolean;
  isHorizontal?: boolean;
  isVertical?: boolean;
}

export default function FlexLayout(props: FlexLayoutProps) {
  const {
    children,
    className,
    isDraggable = false,
    isHorizontal = false,
    isVertical = false,
  } = props;

  const classNames = classnames(styles.flexLayout, className, {
    [styles.horizontal]: isHorizontal,
    [styles.vertical]: isVertical,
  });

  return (
    <div className={classNames} draggable={isDraggable}>
      {children}
    </div>
  );
}
