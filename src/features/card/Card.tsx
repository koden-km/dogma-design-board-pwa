import classnames from "classnames";
import styles from "./Card.module.css";
import type { CardType } from "./types.ts";

export interface CardProps {
  comment?: string;
  subTitle?: string;
  title?: string;
  type: CardType;
}

export default function Card(props: CardProps) {
  const { comment, subTitle, type, title = String(type).toUpperCase() } = props;

  return (
    <div className={classnames(styles.card, styles[type])}>
      <div className={styles.title}>{title}</div>
      {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
      {comment && <p className={styles.comment}>{comment}</p>}
    </div>
  );
}
