import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NetworkChainProperties, NetworkChainsAPIResponse } from "./types";
import { fetchNetworkChainsStatus, parseNetworkChains } from "./utils";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.subsocial.network/subid/api/v1",
  }),
  endpoints(builder) {
    return {
      getNetworkChains: builder.query<NetworkChainProperties[], void>({
        query: () => `/chains/properties`,
        transformResponse: async (
          networkChainsReturned: NetworkChainsAPIResponse,
        ) => {
          const networkChainsParsed = parseNetworkChains(networkChainsReturned);

          const networkStatus = await fetchNetworkChainsStatus(
            networkChainsParsed,
          );

          return networkChainsParsed.map((chain) => ({
            ...chain,
            isActive: networkStatus[chain.name.toLowerCase()],
          }));
        },
      }),
    };
  },
});

export const { useGetNetworkChainsQuery } = apiSlice;
