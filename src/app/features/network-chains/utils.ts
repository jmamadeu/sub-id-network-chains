import { api } from "../../../services/api";
import {
  NetworkChainProperties,
  NetworkChainsAPIResponse,
  NetworkChainStatusProps,
  ReduceChainStatusType
} from "./types";

export const NETWORK_CHAIN_ICON_BASE_URL = "https://sub.id/images";
export const FETCH_CONNECTION_CHAINS_TIME_IN_MLSECONDS = 300000; // 5 min

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

const parseNetworkStatusToObject = (
  networkStatus: Array<NetworkChainStatusProps>,
) => {
  const networkChainsStatus = networkStatus.reduce(
    (accumulator, chain): ReduceChainStatusType => {
      accumulator[chain.name.toLowerCase()] = chain.isActive;

      return accumulator;
    },
    {} as ReduceChainStatusType,
  );
  
  return networkChainsStatus
};

export const getNetworkChainStatus = async (
  networkChains: NetworkChainProperties[],
) => {
  const networkStatus = await Promise.all<NetworkChainStatusProps>(
    networkChains?.map(async ({ name }) => {
      const { data: isActive } = await api.get<boolean>(
        `/check/${name.toLowerCase()}`,
      );

      return { name, isActive };
    }),
  );

  return networkStatus;
};

export const fetchNetworkChainsStatus = async (
  networkChains: NetworkChainProperties[],
) => {
  const networkAPIResponse = await getNetworkChainStatus(networkChains);

  const networkChainsParsed = parseNetworkStatusToObject(networkAPIResponse);

  return networkChainsParsed;
};
