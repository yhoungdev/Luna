import { FC } from "react";
import { axiosInstance } from "../../axiosInstance";
import { RiskThresholds } from "../../enum/analytics";
import { SearchParamError } from "@tanstack/react-router";

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
}

const RiskAnalytics: FC<IProps> = ({
  tokenAddress,
  tokenHoldersResponse,
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


  
  return (
    <div className="text-center">
      <h1 className="my-2 text-4xl bg-gray-800 p-3 w-fit rounded-xl mx-auto">
        {highestHolder ? check : shit}
      </h1>
      <div
        className={`border-2 ${highestHolder ? "border-green-500" : "border-red-500"} py-4`}
      >
        {highestHolder ? "GOOD" : "BAD"}
      </div>
    </div>
  );
};

export default RiskAnalytics;
