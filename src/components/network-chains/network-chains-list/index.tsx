import { v4 } from "uuid";
import { NetworkChainProperties } from "../../../app/features/network-chains/types";
import { NetworkChainCard } from "../network-chain-card";
import styles from "./styles.module.scss";

type NetworkChainListProps = {
  chains: NetworkChainProperties[];
};

export const NetworkChainList = ({ chains }: NetworkChainListProps) => {
  return (
    <section className={styles.container}>
      <h4 className={styles.text}>See all the networks - Sub.id Networks</h4>
      <ul className={styles.content}>
        {chains?.map((chain) => (
          <NetworkChainCard key={v4()} chain={chain} />
        ))}
      </ul>
    </section>
  );
};
