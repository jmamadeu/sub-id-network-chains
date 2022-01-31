import type { NextPage } from "next";
import Head from "next/head";
import {
  apiSlice,
  useGetNetworkChainsQuery
} from "../app/features/network-chains";
import {
  fetchNetworkChainsStatus, FETCH_CONNECTION_CHAINS_STATUS_TIME_IN_MLSECONDS
} from "../app/features/network-chains/utils";
import { useAppDispatch } from "../app/hooks";
import { NetworkChainList } from "../components/network-chains/network-chains-list";
import { useInterval } from "../hooks/use-interval";
import styles from "../styles/home.module.scss";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { data: networkChains } = useGetNetworkChainsQuery();

  useInterval(async () => {
    if (!networkChains) return;

    try {
      const networkStatus = await fetchNetworkChainsStatus(networkChains);

      dispatch(
        apiSlice.util.updateQueryData(
          "getNetworkChains",
          undefined,
          (draftNetworkChains) => {
            draftNetworkChains = draftNetworkChains.map((chain) => ({
              ...chain,
              isActive: networkStatus[chain.name.toLowerCase()],
            }));

            return draftNetworkChains;
          },
        ),
      );
    } catch (err) {}
  }, FETCH_CONNECTION_CHAINS_STATUS_TIME_IN_MLSECONDS);

  return (
    <div>
      <Head>
        <title>Sub Network Connections</title>
        <meta
          name="description"
          content="List all available connections on network"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <NetworkChainList chains={networkChains ?? []} />
        </div>
      </main>
    </div>
  );
};

export default Home;
