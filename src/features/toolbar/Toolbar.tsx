import styles from "./Toolbar.module.css";

import AggregateTool from "./components/AggregateTool.js";
import CommandTool from "./components/CommandTool.js";
import EventTool from "./components/EventTool.js";
import IntegrationTool from "./components/IntegrationTool.js";
import IssueTool from "./components/IssueTool.js";
import HandTool from "./components/LineTool.js";
import PointerTool from "./components/PointerTool.js";
import ProcessTool from "./components/ProcessTool.js";
import ProjectionTool from "./components/ProjectionTool.js";
import TimeoutTool from "./components/TimeoutTool.js";
import ViewTool from "./components/ViewTool.js";

export default function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <PointerTool />
      <HandTool />
      <AggregateTool />
      <CommandTool />
      <EventTool />
      <ProcessTool />
      <TimeoutTool />
      <IntegrationTool />
      <ProjectionTool />
      <ViewTool />
      <IssueTool />
    </div>
  );
}
