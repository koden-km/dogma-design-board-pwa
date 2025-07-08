import type { Domain } from "../types.ts";

export interface DomainBoardProps {
  domain: Domain;
}

export default function DomainBoard(props: DomainBoardProps) {
  const { domain } = props;

  return (
    <div>
      <h1>{domain.name}</h1>

      <div>TODO: render board here</div>
    </div>
  );
}
