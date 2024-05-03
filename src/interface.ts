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

interface ApiResponse {
  id: string;
  jsonrpc: string;
  result: TokenOverviewResult;
  error: null | any;
}

export interface TokenOverviewResult {
  interface: string;
  id: string;
  content: Content;
  authorities: Authority[];
  compression: Compression;
  grouping: any[];
  royalty: Royalty;
  creators: any[];
  ownership: Ownership;
  supply: string;
  mutable: boolean;
  burnt: boolean;
  token_info: TokenInfo;
}

interface Content {
  $schema: string;
  json_uri: string;
  files: File[];
  metadata: Metadata;
  links: Links;
}

interface File {
  uri: string;
  cdn_uri: string;
  mime: string;
}

interface Metadata {
  description: string;
  name: string;
  symbol: string;
  token_standard: string;
}

interface Links {
  image: string;
}

interface Authority {
  address: string;
  scopes: string[];
}

interface Compression {
  eligible: boolean;
  compressed: boolean;
}

interface Royalty {
  royalty_model: string;
  target: null | string;
  percent: number;
  basis_points: number;
  primary_sale_happened: boolean;
  locked: boolean;
}

interface Ownership {
  frozen: boolean;
  delegated: boolean;
  delegate: null | string;
  ownership_model: string;
  owner: string;
}

interface TokenInfo {
  symbol: string;
  supply: number;
  decimals: number;
  token_program: string;
  price_info: PriceInfo;
}

interface PriceInfo {
  price_per_token: number;
  currency: string;
  total_liquidity_usd: number;
  market_cap_usd: number;
}
