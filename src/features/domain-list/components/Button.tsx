import classnames from "classnames";
import styles from "../DomainList.module.css";

interface ButtonProps {
  className?: string;
  label: string;
  onClick: (e: React.PointerEvent<HTMLButtonElement>) => void;
}

export default function Button(props: ButtonProps) {
  const { className, label, onClick } = props;

  return (
    <button
      type="button"
      className={classnames(styles.domainButton, className)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
