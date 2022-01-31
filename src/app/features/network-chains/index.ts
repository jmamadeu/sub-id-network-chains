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
        transformResponse: (
          networkChainsReturned: NetworkChainsAPIResponse,
        ) => {
          const networkChainsParsed = parseNetworkChains(networkChainsReturned);

          return networkChainsParsed;
        },
      }),
      getNetworkChainStatus: builder.query<boolean, string>({
        query: (network) => `/check/${network}`,
        keepUnusedDataFor: 300,
        async onQueryStarted(network, { dispatch, queryFulfilled }) {
          try {
            const { data: isActive } = await queryFulfilled;

            dispatch(
              apiSlice.util.updateQueryData(
                "getNetworkChains",
                undefined,
                (draftNetworkChains) => {
                  draftNetworkChains.map((chain) =>
                    chain.name === network ? { ...chain, isActive } : chain,
                  );
                },
              ),
            );
          } catch (err) {
            console.log(err);
          }
        },
      }),
    };
  },
});

export const { useGetNetworkChainsQuery } = apiSlice;
