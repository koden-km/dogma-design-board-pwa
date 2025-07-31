import styles from "./NoWrap.module.css";

export interface NoWrapProps {
  children?: React.ReactNode;
  className?: string;
}

export default function NoWrap(props: NoWrapProps) {
  const { children, className } = props;
  return <span className={`${styles.noWrap} ${className}`}>{children}</span>;
}
