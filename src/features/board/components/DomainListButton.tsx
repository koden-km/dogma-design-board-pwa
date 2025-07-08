import classnames from "classnames";
import type { Domain } from "../types.ts";
import { useIsCurrentDomain, useSwitchDomain } from "../hooks.ts";
import styles from "./DomainList.module.css";

interface DomainListButtonProps {
  domain: Domain;
}

export default function DomainButton(props: DomainListButtonProps) {
  const { domain } = props;
  const { id, name } = domain;
  const switchDomain = useSwitchDomain(id);
  const isCurrentDomain = useIsCurrentDomain(id);

  const className = classnames(styles.domainListButton, styles.isDomain, {
    [styles.currentDomain]: isCurrentDomain,
  });

  return (
    <button type="button" className={className} onClick={switchDomain}>
      {name}
    </button>
  );
}
