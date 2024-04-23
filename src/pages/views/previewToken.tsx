import { useState } from "react";
import { axiosInstance } from "../../axiosInstance";
import { Header } from "../../components/layout/header";
import Card from "../../components/misc/card";
import FallBackMessage from "../../components/misc/fallbacks/isError";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ITokenHolders, ITokenOverview } from "../../interface";

const PreviewTokenPage = () => {
  const [isVoting, setIsVoting] = useState<false>(false);

  const fetchAllRequest = async () => {
    const tokenHoldersResponse = await axios("/data/holders.json");
    const tokenDataResponse = await axios("/data/overview.json");
    return { tokenHoldersResponse, tokenDataResponse };
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["token-information"],
    queryFn: fetchAllRequest,
  });

  const tokenOverviewResponse: ITokenOverview = data?.tokenDataResponse?.data;
  const tokenHoldersResponse: ITokenHolders = data?.tokenHoldersResponse;

  return (
    <>
      <Header />
      <div className="w-full h-full ">
        <div className="container py-[1em]">
          <div className="flex items-center justify-between">
            <h1 className="gradient-text text-2xl md:text-4xl">
              {tokenOverviewResponse?.Name}
            </h1>
          </div>

          <div className="mt-4">
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-[2em] w-full">
              <Card title="📦 Token Overview" className="w-full">
                {isError && <FallBackMessage />}

                {/* {isLoading && <Skeleton />} */}
                <div className="flex  ites-center gap-3 flex-wrap">
                  {/* <progress value={'30'} className="rounded-full bg-gray"/> */}
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex items-center justify-between w-full">
                      <h1 className="font-bold">Symbol</h1>{" "}
                      <h1>{tokenOverviewResponse?.Symbol}</h1>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h1 className="font-bold">Total Suply</h1>{" "}
                      <h1>{tokenOverviewResponse?.TotalSupply}</h1>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h1 className="font-bold">Token Primary Supply</h1>{" "}
                      <h1>{tokenOverviewResponse?.TokenPrimarySaleHappened ? 'YES' : 'NO'}</h1>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h1 className="font-bold">Token Url</h1>
                      <a href={tokenOverviewResponse?.TokenURI} target="_blank">
                        <small className="text-yellow-600 font-bold">
                          {tokenOverviewResponse?.TokenURI.slice(0, 15)}.....
                          {tokenOverviewResponse?.TokenURI.slice(16, 25)}
                        </small>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="📊 Community Sentiment " className="w-full">
                {/* {isError && <FallBackMessage />} */}
                {/* <div className="flex imtes-center gap-3 flex-col text-center">
                  <div className="bg-text-white bg-red-900 px-4 rounded py-2 font-semibol ">
                    Low Liquidy Provider
                  </div>
                  <div className="bg-text-white bg-green-900 px-4 rounded py-2 font-semibol ">
                    Low Liquidy Provider
                  </div>
                </div> */}
                <div className="flex imtes-center gap-3 flex-col text-center">
                  <div
                    className="bg-text-white bg-red-900 px-4 
                    cursor-pointer rounded py-5 font-bold font-semibol "
                  >
                    Red Flag 🚩
                  </div>
                  <div className="bg-text-white cursor-pointer bg-green-900 px-4 font-bold rounded py-5 font-semibol ">
                    Bullish 🚀
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="mt-5 w-full md:w-[60%]">
              <Card title="🪙 Risk Analytics">
                {/* {isError && <FallBackMessage />} */}
                <div className="flex imtes-center gap-3 flex-col text-center">
                  <div className="bg-text-white bg-red-900 px-4 rounded py-2 font-semibol ">
                    Low Liquidy Provider
                  </div>
                  <div className="bg-text-white bg-green-900 px-4 rounded py-2 font-semibol ">
                    Low Liquidy Provider
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-5 w-full md:w-[40%]">
              <Card title="🪙 Token Holders">
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-center justify-between w-full">
                    <h1 className="font-bold">Address</h1> <h1>4k</h1>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <h1 className="font-bold">Amount</h1> <h1>4k</h1>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <h1 className="font-bold">Percentage</h1>{" "}
                    <h1 className="text-yellow-600 font-bold">$4k</h1>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewTokenPage;
