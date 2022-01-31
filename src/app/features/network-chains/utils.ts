import { NetworkChainProperties, NetworkChainsAPIResponse } from "./types";

export const NETWORK_CHAIN_ICON_BASE_URL = "https://sub.id/images";
export const FETCH_CONNECTION_CHAINS_TIME_IN_MLSECONDS = 300000 // 5 min

export const sortNetworkChains = (
  networkChains: Array<NetworkChainProperties>,
) => {
  const networkChainsSorted = networkChains.filter(
    (chainKey) => chainKey?.tokenDecimals && chainKey?.tokenSymbol,
  );

  return networkChainsSorted;
};

export const parseNetworkChainsToArrayFormat = (
  networkChainsRaw: NetworkChainsAPIResponse,
) => {
  const networkChainKeys = Object.keys(networkChainsRaw);

  const networksChainsParsed = networkChainKeys.map((chainKey) => ({
    ...networkChainsRaw[chainKey],
    iconURL: `${NETWORK_CHAIN_ICON_BASE_URL}/${networkChainsRaw[chainKey].icon}`,
    isActive: true,
  }));

  return networksChainsParsed;
};

export const parseNetworkChains = (
  networkChainsRaw: NetworkChainsAPIResponse,
) => {
  let networkChainsParsed = sortNetworkChains(
    parseNetworkChainsToArrayFormat(networkChainsRaw),
  );

  return networkChainsParsed;
};
