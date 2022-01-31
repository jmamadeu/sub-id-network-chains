import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NetworkChainProperties, NetworkChainsAPIResponse } from "./types";
import { parseNetworkChains } from "./utils";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.subsocial.network/subid/api/v1",
  }),
  endpoints(builder) {
    return {
      getNetworkChains: builder.query<NetworkChainProperties[], void>({
        query: () => `/chains/properties`,
        transformResponse: (networkChainsReturned: NetworkChainsAPIResponse) => {
          const networkChainsParsed = parseNetworkChains(networkChainsReturned);

          return networkChainsParsed;
        },
      }),
      getNetworkChainStatus: builder.query<void, string>({
        query: (network) => `/check/${network}`,
        transformResponse: () => {
          
        }
      })
    };
  },
});

export const { useGetNetworkChainsQuery } = apiSlice;
