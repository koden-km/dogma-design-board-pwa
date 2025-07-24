import Card from "@/features/card/Card.tsx";
import type { NodeInst } from "../types.ts";
import { useCurrentDomain, useDomainName, useDomainNode } from "../hooks.ts";

export interface NodeCardProps {
  nodeInst: NodeInst;
}

export default function NodeCard(props: NodeCardProps) {
  const { domainId, nodeId, comment } = props.nodeInst;
  const { name, type } = useDomainNode(domainId, nodeId);
  const currentDomain = useCurrentDomain();
  const domainName = useDomainName(domainId);
  const subTitle = currentDomain.name === domainName ? undefined : domainName;

  return (
    <Card type={type} title={name} subTitle={subTitle} comment={comment} />
  );
}
