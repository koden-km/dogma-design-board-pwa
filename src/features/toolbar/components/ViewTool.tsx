import ToolButton from "./ToolButton.tsx";
import { TT_VIEW } from "../types.ts";

export default function ViewTool() {
  return <ToolButton tool={TT_VIEW} isCard />;
}
