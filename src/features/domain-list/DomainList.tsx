import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAddDomain, useDomainList } from "@/features/board/hooks.ts";
import styles from "./DomainList.module.css";
import DomainButton from "./components/DomainButton.tsx";
import Button from "./components/Button.tsx";

export default function DomainList() {
  const domainList = useDomainList();
  const [isVisible, setIsVisible] = useState(false);
  const addDomain = useAddDomain();

  const handleToggle = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const handleAdd = useCallback(() => {
    const id = uuidv4();
    addDomain(id, `New Domain (${id.split("-", 1)[0]})`);
  }, []);

  return (
    <div className={styles.domainList}>
      <Button label={isVisible ? "<<" : "Domains >>"} onClick={handleToggle} />

      {isVisible && (
        <>
          {domainList.map((domain) => (
            <DomainButton key={domain.id} domain={domain} />
          ))}

          <Button label="+" onClick={handleAdd} />
        </>
      )}
    </div>
  );
}
