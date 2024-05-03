import IsSkeletonLoader from "../../components/misc/fallbacks/isSkeletonLoading";
import FallBackMessage from "../../components/misc/fallbacks/isError";
import { TokenOverviewResult } from "../../interface";
import numeral from "numeral";

interface ITokenOverviewship {
  address?: string;
  tokenData: TokenOverviewResult;
  isLoading?: boolean;
  isError?: boolean;
}
const GetTokenOverview = ({
  address,
  tokenData,
  isLoading,
  isError,
}: ITokenOverviewship) => {
  const tokenInfo = tokenData?.token_info;

  return (
    <div>
      <div className="flex  ites-center gap-3 flex-wrap">
        {isLoading ? (
          <IsSkeletonLoader />
        ) : isError ? (
          <FallBackMessage />
        ) : (
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between w-full">
              <h1 className="font-bold">Symbol</h1> <h1>{tokenInfo?.symbol}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="font-bold">Total Suply</h1>{" "}
              <h1>{numeral(tokenInfo?.supply).format("0 , 0")}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="font-bold">Token Standard</h1>{" "}
              <h1>{tokenData?.content?.metadata?.token_standard}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="font-bold">Market Cap</h1>{" "}
              <h4>
                {numeral(tokenInfo?.price_info?.market_cap_usd).format("0,0a")}
              </h4>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="font-bold">Price</h1>
              <a href={"data?.TokenURI"} target="_blank">
                <small className="text-yellow-600 font-bold">
                  ${tokenInfo?.price_info?.price_per_token}
                </small>
              </a>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="font-bold">Checkup</h1>
              <a href={"data?.TokenURI"} target="_blank">
                <small className="text-yellow-600 ">
                  <a
                    href={`https://dexscreener.com/solana/${address}`}
                    target="_blank"
                  >
                    {`https://dexscreener.com/solana/${address?.slice(0, 1)}`}
                  </a>
                </small>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetTokenOverview;
