import { useQuery } from "@tanstack/react-query";
import IsSkeletonLoader from "../../components/misc/fallbacks/isSkeletonLoading";
import FallBackMessage from "../../components/misc/fallbacks/isError";
import { axiosInstance } from "../../axiosInstance";
import { ITokenOverview } from "../../interface";

const GetTokenOverview = ({ address }: { address: string }) => {
  const fetchOverview = async () => {
    const response = await axiosInstance<ITokenOverview>(
      `/v2/token/${address}`,
    );

    return response?.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetch-token-overview"],
    queryFn: fetchOverview,
  });

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
              <h1 className="font-bold">Symbol</h1> <h1>{data?.Symbol}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="font-bold">Total Suply</h1>{" "}
              <h1>{data?.TotalSupply}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="font-bold">Token Primary Supply</h1>{" "}
              <h1>{data?.TokenPrimarySaleHappened ? "YES" : "NO"}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="font-bold">Token Url</h1>
              <a href={data?.TokenURI} target="_blank">
                <small className="text-yellow-600 font-bold">
                  {data?.TokenURI?.slice(0, 15)}
                  .....
                  {data?.TokenURI?.slice(16, 25)}
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
