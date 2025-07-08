import { useCurrentDomain } from "./hooks.ts";
import DomainBoard from "./components/DomainBoard.tsx";
import DomainList from "./components/DomainList.tsx";
import Toolbar from "../toolbar/Toolbar.tsx";

export default function Board() {
  const currentDomain = useCurrentDomain();

  return (
    <div>
      <DomainList />
      <DomainBoard domain={currentDomain} />
      <Toolbar />
    </div>
  );
}
