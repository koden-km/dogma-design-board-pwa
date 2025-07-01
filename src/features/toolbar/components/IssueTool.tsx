import ToolButton from "./ToolButton.tsx";
import { TT_ISSUE } from "../types.ts";

export default function IssueTool() {
  return <ToolButton tool={TT_ISSUE} isCard />;
}
