import classnames from "classnames";
import styles from "./Card.module.css";
import type { CardType } from "./types.ts";

export interface CardProps {
  comment?: string;
  title?: string;
  type: CardType;
}

export default function Card(props: CardProps) {
  const { comment, type, title = String(type).toUpperCase() } = props;

  return (
    <div className={classnames(styles.card, styles[type])}>
      <div className={styles.title}>{title}</div>
      {comment && <div className={styles.comment}>{comment}</div>}
    </div>
  );
}
