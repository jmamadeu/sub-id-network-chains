import type { NextPage } from "next";
import Head from "next/head";
import { v4 } from "uuid";
import {
  apiSlice,
  useGetNetworkChainsQuery
} from "../app/features/network-chains";
import { fetchNetworkChainsStatus } from "../app/features/network-chains/utils";
import { useAppDispatch } from "../app/hooks";
import { NetworkChainCard } from "../components/network-chains/network-chain-card";
import { useInterval } from "../hooks/use-interval";

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
  }, 5000);

  console.log(networkChains, "test");

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

      <main>
        <ul>
          {networkChains?.map((chain) => (
            <NetworkChainCard key={v4()} chain={chain} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
