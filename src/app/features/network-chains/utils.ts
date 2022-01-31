export const NETWORK_CHAIN_ICON_BASE_URL = "https://sub.id/images";

import { NetworkChainAPIResponse, NetworkChainProperties } from "./types";

export const sortNetworkChains = (
  networkChains: Array<NetworkChainProperties>,
) => {
  const networkChainsSorted = networkChains.filter(
    (chainKey) => chainKey?.tokenDecimals && chainKey?.tokenSymbol,
  );

  return networkChainsSorted;
};

export const parseNetworkChainsToArrayFormat = (
  networkChainsRaw: NetworkChainAPIResponse,
) => {
  const networkChainKeys = Object.keys(networkChainsRaw);

  const networksChainsParsed = networkChainKeys.map((chainKey) => ({
    ...networkChainsRaw[chainKey],
  }));

  return networksChainsParsed;
};

export const addImageURLToNetworkChains = (
  networkChains: Array<NetworkChainProperties>,
) => {
  const networkChainsSorted = networkChains.map((chain) => ({
    ...chain,
    iconURL: `${NETWORK_CHAIN_ICON_BASE_URL}/${chain.icon}`,
  }));

  return networkChainsSorted;
};

export const parseNetworkChains = (
  networkChainsRaw: NetworkChainAPIResponse,
) => {
  let networkChainsParsed = parseNetworkChainsToArrayFormat(networkChainsRaw);

  networkChainsParsed = sortNetworkChains(networkChainsParsed);

  networkChainsParsed = addImageURLToNetworkChains(networkChainsParsed);

  return networkChainsParsed;
};
