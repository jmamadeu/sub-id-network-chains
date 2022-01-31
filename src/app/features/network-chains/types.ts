export type NetworkChainProperties = {
  ss58Format?: number;
  tokenDecimals?: Array<Number>;
  tokenSymbol?: Array<string>;
  icon: string;
  name: string;
  iconURL: string;
  isActive: boolean;
};

export type NetworkChainAPIResponse = Omit<
  NetworkChainProperties,
  "iconURL" | "isActive"
>;

export type NetworkChainsAPIResponse = {
  [x: string]: NetworkChainAPIResponse;
};

export type NetworkChainsArrayAPIResponse = Array<NetworkChainAPIResponse>;

export type ReduceChainStatusType = {
  [x: string]: boolean;
};

export type NetworkChainStatusProps = { name: string; isActive: boolean };
