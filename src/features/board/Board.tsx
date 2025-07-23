import { useCurrentDomain } from "./hooks.ts";
import DomainBoard from "./components/DomainBoard.tsx";
import DomainList from "../domain-list/DomainList.tsx";
import Toolbar from "../toolbar/Toolbar.tsx";

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
