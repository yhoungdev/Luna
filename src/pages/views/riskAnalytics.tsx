/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";

const shit = "🗑️";
const check = "✅";

interface TokenHolder {
  address: string;
  uiAmount: number;
  percentage: number;
}

interface IProps {
  tokenAddress?: string;
  tokenHoldersResponse?: TokenHolder[];
  tokenSentiment?: number;
}

const RiskAnalytics: FC<IProps> = ({
  tokenAddress,
  tokenHoldersResponse,
  tokenSentiment,
}): JSX.Element => {
  const findHighestTokenHolder = (
    holders: TokenHolder[],
  ): TokenHolder | null => {
    if (!holders || holders.length === 0) return null;
    return holders.reduce(
      (max, holder) => (max.uiAmount > holder.uiAmount ? max : holder),
      holders[0],
    );
  };

  const highestHolder = tokenHoldersResponse
    ? findHighestTokenHolder(tokenHoldersResponse)
    : null;

  const isOwnershipConcentrated = tokenHoldersResponse
    ? tokenHoldersResponse.some((holder) => holder.percentage > 40)
    : false;

  const isSentimentPositive = tokenSentiment && tokenSentiment >= 50;
  sessionStorage.setItem(
    "sentimentCheck",
    isSentimentPositive ? "true" : "false",
  );
  return (
    <div className="text-center">
      <h1 className="my-2 text-4xl bg-gray-800 p-3 w-fit rounded-xl mx-auto">
        {highestHolder ? check : shit}
      </h1>
      <div
        className={`border-2 ${highestHolder ? "border-green-500" : "border-red-500"} py-4`}
      >
        Highest Holder: {highestHolder ? "GOOD" : "BAD"}
      </div>
      <div
        className={`border-2 ${isOwnershipConcentrated ? "border-red-500" : "border-green-500"} py-4 mt-2`}
      >
        Ownership Concentration:{" "}
        {isOwnershipConcentrated ? "Risky (>40%)" : "Safe"}
      </div>
      <div
        className={`border-2 ${isSentimentPositive ? "border-green-500" : "border-red-500"} py-4 mt-2`}
      >
        Community Sentiment: {isSentimentPositive ? "Positive" : "Negative"}
      </div>
    </div>
  );
};

export default RiskAnalytics;
