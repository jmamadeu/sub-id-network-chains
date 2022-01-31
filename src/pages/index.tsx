import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { api, NETWORK_CHAIN_ICON_BASE_URL } from "../services/api";

type NetworkChainProperties = {
  ss58Format?: number;
  tokenDecimals?: Array<Number>;
  tokenSymbol?: Array<string>;
  icon: string;
  name: string;
  iconURL: string;
};

type NetworkChainAPIResponse = {
  [x: string]: NetworkChainProperties;
};

const sortNetworkChains = (networkChains: Array<NetworkChainProperties>) => {
  const networkChainsSorted = networkChains.filter(
    (chainKey) => chainKey?.tokenDecimals && chainKey?.tokenSymbol,
  );

  return networkChainsSorted;
};

const parseNetworkChainsToArrayFormat = (
  networkChainsRaw: NetworkChainAPIResponse,
) => {
  const networkChainKeys = Object.keys(networkChainsRaw);

  const networksChainsParsed = networkChainKeys.map((chainKey) => ({
    ...networkChainsRaw[chainKey],
  }));

  return networksChainsParsed;
};

const addImageURLToNetworkChains = (
  networkChains: Array<NetworkChainProperties>,
) => {
  const networkChainsSorted = networkChains.map((chain) => ({
    ...chain,
    iconURL: `${NETWORK_CHAIN_ICON_BASE_URL}/${chain.icon}`,
  }));

  return networkChainsSorted;
};

const parseNetworkChains = (networkChainsRaw: NetworkChainAPIResponse) => {
  let networkChainsParsed = parseNetworkChainsToArrayFormat(networkChainsRaw);

  networkChainsParsed = sortNetworkChains(networkChainsParsed);

  networkChainsParsed = addImageURLToNetworkChains(networkChainsParsed);

  return networkChainsParsed;
};

const fetchNetworkChains = async () => {
  const { data: networksResponse } = await api.get<NetworkChainAPIResponse>(
    "/chains/properties",
  );

  const networksParsed = parseNetworkChains(networksResponse);

  return networksParsed;
};

const Home: NextPage = () => {
  const [networkChains, setNetworkChains] = useState<
    Array<NetworkChainProperties>
  >([]);

  const getNetworkChains = async () => {
    try {
      const networkChainsParsed = await fetchNetworkChains();

      setNetworkChains(networkChainsParsed);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNetworkChains();
  }, []);

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
