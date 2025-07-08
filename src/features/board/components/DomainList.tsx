import { useCallback, useState } from "react";
import { useDomainList } from "../hooks.ts";
import styles from "./DomainList.module.css";
import DomainListButton from "./DomainListButton.tsx";

export default function DomainList() {
  const domainList = useDomainList();
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  return (
    <div className={styles.domainList}>
      <button
        type="button"
        className={styles.domainListButton}
        onClick={handleClick}
      >
        {isVisible ? "<<" : "Domains >>"}
      </button>

      {isVisible &&
        domainList.map((domain) => (
          <DomainListButton key={domain.id} domain={domain} />
        ))}
    </div>
  );
}
