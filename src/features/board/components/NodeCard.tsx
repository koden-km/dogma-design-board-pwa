import { useEffect, useRef } from "react";
import Card from "@/features/card/Card.tsx";
import { DDF_NODE_X, type NodeInst } from "../types.ts";
import { useCurrentDomain, useDomainName, useDomainNodeDef } from "../hooks.ts";
import { createDnDNodeInst } from "../util.ts";
import Selectable from "./Selectable.tsx";

export interface NodeCardProps {
  nodeInst: NodeInst;
}

export default function NodeCard(props: NodeCardProps) {
  const { comment, domainId, defId, id } = props.nodeInst;
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
        e.dataTransfer.setData(
          DDF_NODE_X,
          createDnDNodeInst(domainId, defId, id, type)
        );
        e.dataTransfer.effectAllowed = "move";
      }
    };

    elRef.addEventListener("dragstart", dragStartHandler);

    return () => {
      elRef.removeEventListener("dragstart", dragStartHandler);
    };
  }, [domainId, defId, id, ref, type]);

  return (
    <div ref={ref} draggable>
      <Selectable id={id}>
        <Card type={type} title={name} subTitle={subTitle} comment={comment} />
      </Selectable>
    </div>
  );
}
