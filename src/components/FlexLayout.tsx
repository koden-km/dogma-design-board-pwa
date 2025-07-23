import classnames from "classnames";
import styles from "./FlexLayout.module.css";

export interface FlexLayoutProps {
  children?: React.ReactNode;
  className?: string;
  isHorizontal?: boolean;
  isVertical?: boolean;
}

export default function FlexLayout(props: FlexLayoutProps) {
  const {
    children,
    className,
    isHorizontal = false,
    isVertical = false,
  } = props;

  const classNames = classnames(styles.container, className, {
    [styles.horizontal]: isHorizontal,
    [styles.vertical]: isVertical,
  });

  return <div className={classNames}>{children}</div>;
}
