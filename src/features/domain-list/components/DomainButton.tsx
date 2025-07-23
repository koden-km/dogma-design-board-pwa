import classnames from "classnames";
import type { Domain } from "../../board/types.ts";
import { useIsCurrentDomain, useSwitchDomain } from "../../board/hooks.ts";
import styles from "../DomainList.module.css";

interface DomainButtonProps {
  domain: Domain;
}

export default function DomainButton(props: DomainButtonProps) {
  const { domain } = props;
  const { id, name } = domain;
  const switchDomain = useSwitchDomain(id);
  const isCurrentDomain = useIsCurrentDomain(id);

  const className = classnames(styles.domainButton, styles.isDomain, {
    [styles.currentDomain]: isCurrentDomain,
  });

  return (
    <button type="button" className={className} onClick={switchDomain}>
      {name}
    </button>
  );
}
