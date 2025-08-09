import classnames from "classnames";
import type { Domain } from "@/features/board/types.ts";
import { useIsCurrentDomain, useSwitchDomain } from "@/features/board/hooks.ts";
import styles from "../DomainList.module.css";
import Button from "./Button";

interface DomainButtonProps {
  domain: Domain;
}

export default function DomainButton(props: DomainButtonProps) {
  const { domain } = props;
  const { id, name } = domain;
  const switchDomain = useSwitchDomain(id);
  const isCurrentDomain = useIsCurrentDomain(id);

  const className = classnames(styles.isDomain, {
    [styles.currentDomain]: isCurrentDomain,
  });

  return <Button label={name} className={className} onClick={switchDomain} />;
}
