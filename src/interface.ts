export interface ITokenOverview {
  Name: string;
  Symbol: string;
  TotalSupply: string;
  TokenPrimarySaleHappened: boolean;
  TokenURI: string;
  UpdateAuthority: string;
  Decimals: number;
}

export interface ITokenHolderData {
  data: ITokenHolderData[];
}
export interface ITokenHolders {
  address: string;
  uiAmount: Float32Array;
  percentage: Float32Array;
}

export interface ICommunitySentiment {
  tokenAddress: string;
  sentiment: "neutral" | "positive" | "negative";
  sentimentScore: number;
}

export interface IMarketView {
  liquidity_usd: string;
  pair: string;
  pair_address: string;
  dex_id: string;
}
