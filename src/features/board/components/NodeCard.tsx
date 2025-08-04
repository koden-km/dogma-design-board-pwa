import { useEffect, useRef } from "react";
import Card from "@/features/card/Card.tsx";
import {
  DDF_NODE_X,
  type NodeInst,
  type IOGroupPath,
  type OperatorGroupPath,
} from "../types.ts";
import { useCurrentDomain, useDomainName, useDomainNodeDef } from "../hooks.ts";
import Selectable from "./Selectable.tsx";
import { packDnDNodeInst } from "../util.ts";

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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elRef = ref.current;

    const dragStartHandler = (e: DragEvent) => {
      if (e.dataTransfer) {
        // force path to be a full IO Group path with an undefined ioGroupId
        e.dataTransfer.setData(
          DDF_NODE_X,
          packDnDNodeInst(path as IOGroupPath, id, type)
        );
        e.dataTransfer.effectAllowed = "move";
      }
    };

    elRef.addEventListener("dragstart", dragStartHandler);

    return () => {
      elRef.removeEventListener("dragstart", dragStartHandler);
    };
  }, [path, id, ref, type]);

  return (
    <div ref={ref} draggable>
      <Selectable id={id}>
        <Card type={type} title={name} subTitle={subTitle} comment={comment} />
      </Selectable>
    </div>
  );
}
