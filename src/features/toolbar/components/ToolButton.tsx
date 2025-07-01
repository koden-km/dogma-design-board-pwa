import classnames from "classnames";
import styles from "../Toolbar.module.css";
import type { ToolType } from "../types.ts";
import cardStyles from "../../card/Card.module.css";

interface ToolButtonProps {
  children?: React.ReactNode;
  isCard?: boolean;
  tool: ToolType;
}

export default function ToolButton(props: ToolButtonProps) {
  const { children, isCard, tool } = props;

  const selectTool = () => {
    console.log("select tool:", tool);
  };

  const isCurrentTool = false;

  const className = classnames(styles.toolButton, {
    [styles.currentTool]: isCurrentTool,
    [cardStyles[tool]]: isCard,
    [styles.isGenericTool]: !isCard,
  });

  return (
    <button type="button" className={className} onClick={selectTool}>
      {tool.toUpperCase()}
      {children}
    </button>
  );
}
