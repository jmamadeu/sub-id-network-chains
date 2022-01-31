import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { v4 } from "uuid";
import {
  apiSlice,
  useGetNetworkChainsQuery
} from "../app/features/network-chains";
import { FETCH_CONNECTION_CHAINS_TIME_IN_MLSECONDS } from "../app/features/network-chains/utils";
import { useAppDispatch } from "../app/hooks";
import { useInterval } from "../hooks/use-interval";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { data: networkChains } = useGetNetworkChainsQuery();

  useInterval(async () => {
    networkChains?.map(async (chain) => {
      dispatch(
        apiSlice.endpoints.getNetworkChainStatus.initiate(
          chain.name.toLowerCase(),
          { forceRefetch: true },
        ),
      );
    });
  }, FETCH_CONNECTION_CHAINS_TIME_IN_MLSECONDS);

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
            <li key={v4()}>
              <div>
                <Image
                  src={chain.iconURL ?? "https://fav.ico"}
                  alt={chain.icon}
                  width={50}
                  height={50}
                />
              </div>
              <div>
                <span>{chain.name}</span>
                <span>{chain.ss58Format}</span>
                <p>{chain.tokenSymbol?.join("")}</p>
                <p>{chain.tokenDecimals?.join("")}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
