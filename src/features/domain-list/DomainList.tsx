import { useCallback, useState } from "react";
import { useDomainList } from "@/features/board/hooks.ts";
import styles from "./DomainList.module.css";
import DomainButton from "./components/DomainButton.tsx";

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
        className={styles.domainButton}
        onClick={handleClick}
      >
        {isVisible ? "<<" : "Domains >>"}
      </button>

      {isVisible &&
        domainList.map((domain) => (
          <DomainButton key={domain.id} domain={domain} />
        ))}
    </div>
  );
}
