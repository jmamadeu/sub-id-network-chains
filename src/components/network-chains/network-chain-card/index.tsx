import Image from "next/image";
import { NetworkChainProperties } from "../../../app/features/network-chains/types";
import styles from "./styles.module.scss";

type NetworkChainCardProps = {
  chain: NetworkChainProperties;
};

export const NetworkChainCard = ({ chain }: NetworkChainCardProps) => {
  return (
    <li className={`${styles.listCard} ${chain.isActive ? styles.listCardOn : styles.listCardOff}`}>
      <div className={styles.image}>
        <Image
          src={chain.iconURL ?? "https://fav.ico"}
          alt={chain.icon}
          width={50}
          height={50}
        />
      </div>
      <div>
        <span>{chain.name}</span>
        <span> - format: ({chain.ss58Format})</span>
        <p>
          decimals: <b> {chain.tokenDecimals?.join("")}</b>
        </p>
      </div>
    </li>
  );
};

