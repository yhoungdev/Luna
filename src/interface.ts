export interface ITokenOverview {
  Name: string;
  Symbol: string;
  TotalSupply: string;
  TokenPrimarySaleHappened: boolean;
  TokenURI: string;
  UpdateAuthority: string;
  Decimals: number;
}

export interface ITokenHolders {
  address: string;
  uiAmount: number | bigint;
  percentage: unknown;
}
