import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axiosInstance";
import { IMarketView } from "../../interface";
import IsSkeletonLoader from "../../components/misc/fallbacks/isSkeletonLoading";
import FallBackMessage from "../../components/misc/fallbacks/isError";
import numeral from "numeral";

const MarketsViews = ({ address }: { address: string }) => {
  const fetchOverview = async () => {
    const response = await axiosInstance<IMarketView>(`/market/${address}`);

    return response?.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetch-markets-data"],
    queryFn: fetchOverview,
  });

  return (
    <div className="w-full ">
      {isLoading && <IsSkeletonLoader count={3} />}

      {isError && <FallBackMessage />}

      {data && (
        <div className="flex flex-col items-center  w-full overflow-x-auto h-[300px]">
          <div className="flex items-center justify-between w-full mb-4">
            <h1 className="font-bold flex-1 text-left pl-4">Liquidity</h1>
            <h1 className="font-bold flex-1 text-left">Pair</h1>
            <h1 className="font-bold flex-1 text-left">Market</h1>
          </div>

          <div className="flex text-sm items-center w-full mt-3 text-left pl-3">
            <h1 className="text-left flex-1">
              {numeral(data?.liquidity_usd).format("0 ,0a")}
            </h1>
            <h1 className="text-left flex-1 text-yellow-600 font-semibold">
              {data?.pair}
            </h1>
            {/* <img src="/assets/raydium.png" width={100} alt="" /> */}
            <h1 className="font-bold flex-1"> {data?.dex_id}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketsViews;
