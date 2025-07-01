import ToolButton from "./ToolButton.tsx";
import { TT_COMMAND } from "../types.ts";

export default function CommandTool() {
  return <ToolButton tool={TT_COMMAND} isCard />;
}
