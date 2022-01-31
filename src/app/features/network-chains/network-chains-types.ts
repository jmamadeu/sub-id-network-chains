export type NetworkChainProperties = {
  ss58Format?: number;
  tokenDecimals?: Array<Number>;
  tokenSymbol?: Array<string>;
  icon: string;
  name: string;
  iconURL: string;
};

export type NetworkChainAPIResponse = {
  [x: string]: NetworkChainProperties;
};