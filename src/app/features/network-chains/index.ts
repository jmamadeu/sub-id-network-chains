import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NetworkChainAPIResponse, NetworkChainProperties } from "./types";
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
        transformResponse: (networkChainsReturned: NetworkChainAPIResponse) => {
          const networkChainsParsed = parseNetworkChains(networkChainsReturned);

          return networkChainsParsed;
        },
      }),
    };
  },
});

export const { useGetNetworkChainsQuery } = apiSlice;
