import { useCallback } from "react";
import Card from "@/features/card/Card.tsx";
import {
  DDF_NODE_X,
  type NodeInst,
  type IOGroupPath,
  type OperatorGroupPath,
} from "../types.ts";
import {
  useCurrentDomain,
  useDomainName,
  useDomainNodeDef,
  useExportNodeDef,
  useIsSelected,
} from "../hooks.ts";
import { packDnDNodeInst } from "../util.ts";
import Draggable from "./Draggable.tsx";
import Selectable from "./Selectable.tsx";

export interface NodeCardProps {
  path: OperatorGroupPath | IOGroupPath;
  nodeInst: NodeInst;
}

export default function NodeCard(props: NodeCardProps) {
  const { path, nodeInst } = props;
  const { comment, domainId, defId, id } = nodeInst;
  const { name, type } = useDomainNodeDef(domainId, defId);
  const currentDomain = useCurrentDomain();
  const domainName = useDomainName(domainId);
  const subTitle = currentDomain.name === domainName ? undefined : domainName;
  const isSelected = useIsSelected(id);
  const handleExport = useExportNodeDef(nodeInst);

  const handleDragStart = useCallback(
    (e: DragEvent) => {
      if (e.dataTransfer) {
        e.stopPropagation();
        // force path to be a full IO Group path with an undefined ioGroupId
        e.dataTransfer.setData(
          DDF_NODE_X,
          packDnDNodeInst(path as IOGroupPath, id, type)
        );
        e.dataTransfer.effectAllowed = "move";
      }
    },
    [id, path, type]
  );

  return (
    <Draggable onDragStart={handleDragStart}>
      <Selectable id={id}>
        <Card type={type} title={name} subTitle={subTitle} comment={comment} />

        {isSelected && (
          <div>
            {/* <button type="button">Remove</button> */}
            <button type="button" onClick={handleExport}>
              Export
            </button>
          </div>
        )}
      </Selectable>
    </Draggable>
  );
}
