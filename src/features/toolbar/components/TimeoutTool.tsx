import ToolButton from "./ToolButton.tsx";
import { TT_TIMEOUT } from "../types.ts";

export default function TimeoutTool() {
  return <ToolButton tool={TT_TIMEOUT} isCard />;
}
