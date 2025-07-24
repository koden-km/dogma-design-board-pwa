import DomainList from "@/features/domain-list/DomainList.tsx";
import Toolbar from "@/features/toolbar/Toolbar.tsx";
import DomainBoard from "./components/DomainBoard.tsx";
import { useCurrentDomain } from "./hooks.ts";

export default function Board() {
  const currentDomain = useCurrentDomain();

  return (
    <div>
      <DomainBoard domain={currentDomain} />
      <DomainList />
      <Toolbar />
    </div>
  );
}
