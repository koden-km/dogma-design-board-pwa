import type { NodeInst } from "../types.ts";
import { useDomainNode } from "../hooks.ts";
import Card from "../../card/Card.tsx";

export interface NodeCardProps {
  nodeInst: NodeInst;
}

export default function NodeCard(props: NodeCardProps) {
  const { domainId, nodeId, comment } = props.nodeInst;
  const { name, type } = useDomainNode(domainId, nodeId);

  return <Card type={type} title={name} comment={comment} />;
}
