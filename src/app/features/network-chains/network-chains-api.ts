import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NetworkChainAPIResponse, NetworkChainProperties } from "./network-chains-types";

export const NETWORK_CHAIN_ICON_BASE_URL = "https://sub.id/images"

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

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.subsocial.network/subid/api/v1",
  }),
  endpoints(builder) {
    return {
      getNetworkChains: builder.query<NetworkChainProperties[], void>({
        query: () => `/chains/properties`,
        transformResponse: (networkChainsReturned: NetworkChainAPIResponse) => {
          const networkChainsParsed = parseNetworkChains(networkChainsReturned)

          return networkChainsParsed
        }
      }),
    };
  },
});

export const { useGetNetworkChainsQuery } = apiSlice;
