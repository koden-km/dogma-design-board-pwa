import ToolButton from "./ToolButton.tsx";
import { TT_PROJECTION } from "../types.ts";

export default function ProjectionTool() {
  return <ToolButton tool={TT_PROJECTION} isCard />;
}
