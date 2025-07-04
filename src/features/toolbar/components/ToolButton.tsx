import classnames from "classnames";
import styles from "../Toolbar.module.css";
import type { ToolType } from "../types.ts";
import cardStyles from "../../card/Card.module.css";
import { useIsCurrentTool, useSwitchTool } from "../../board/hooks.ts";

interface ToolButtonProps {
  children?: React.ReactNode;
  isCard?: boolean;
  tool: ToolType;
}

export default function ToolButton(props: ToolButtonProps) {
  const { children, isCard, tool } = props;
  const switchTool = useSwitchTool(tool);
  const isCurrentTool = useIsCurrentTool(tool);

  const className = classnames(styles.toolButton, {
    [styles.currentTool]: isCurrentTool,
    [cardStyles[tool]]: isCard,
    [styles.isGenericTool]: !isCard,
  });

  return (
    <button type="button" className={className} onClick={switchTool}>
      {!children && tool.toUpperCase()}
      {children}
    </button>
  );
}
