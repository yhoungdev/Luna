/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useState } from "react";
import { Header } from "../../components/layout/header";
import Card from "../../components/misc/card";
import FallBackMessage from "../../components/misc/fallbacks/isError";
import { useQuery } from "@tanstack/react-query";
import { ITokenHolders, ITokenOverview } from "../../interface";
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";
import numeral from "numeral";
import IsSkeletonLoader from "../../components/misc/fallbacks/isSkeletonLoading";
import { axiosInstance } from "../../axiosInstance";
import IsNotConnected from "../../components/misc/fallbacks/isNotConnected";
import { parsePoolInfo } from "../../utils/analysis";
import RiskAnalytics from "./riskAnalytics";


const PreviewTokenPage = () => {
  const [isVoting, setIsVoting] = useState<false>(false);
  const searchParams: string = window.location.search.split("=")[1];
  const { connected } = useWallet();
  const walletAddress = useWallet().publicKey?.toString();

  const fetchAllRequest = async () => {
    const tokenHoldersResponse = await axiosInstance<ITokenHolders>(
      `/v3/token-holders/?token=${searchParams}`,
    );
    const tokenDataResponse = await axiosInstance<ITokenOverview>(
      `/v2/token/${searchParams}`,
    );
    return {
      tokenHolders: tokenHoldersResponse?.data,
      tokenOverview: tokenDataResponse.data,
    };
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetch-all-token-utils"],
    queryFn: fetchAllRequest,
  });

  const tokenOverviewResponse = data?.tokenOverview;
  const tokenHoldersResponse = data?.tokenHolders;

  const castTokenVote = async (value: boolean) => {
    try {
      setIsVoting(true);
      const requestVote = await axiosInstance("/vote", {
        token_address: searchParams,
        wallet_address: walletAddress,
        vote: value,
      });
      return requestVote;
    } catch (err) {
      const errMsg = err?.response?.message || err.message;
      return errMsg;
    } finally {
      setIsVoting(false);
    }
  };

  const handlePromiseOnVote = () =>
    toast.promise(castTokenVote(true), {
      pending: "Castnig vote",
      success: "Vote successful",
      error: "Vote failed",
    });

  return (
    <>
      <Header />
      <div className="w-full h-full ">
        {
          connected ?     <div className="container py-[1em]">
          <div className="flex items-center justify-between w-full">
            <h1 className="gradient-text text-2xl md:text-4xl w-full md:w-[30%]">
              {isLoading && <IsSkeletonLoader count={1} />}
              {isError && "Failed to Load Name"}
              {data && tokenOverviewResponse?.Name}
            </h1>
          </div>

          <div className="mt-4">
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-[2em] w-full">
              <Card title="📦 Token Overview" className="w-full">
                <div className="flex  ites-center gap-3 flex-wrap">
                  {isLoading ? (
                    <IsSkeletonLoader />
                  ) : isError ? (
                    <FallBackMessage />
                  ) : (
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
                        <h1>
                          {tokenOverviewResponse?.TokenPrimarySaleHappened
                            ? "YES"
                            : "NO"}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <h1 className="font-bold">Token Url</h1>
                        <a
                          href={tokenOverviewResponse?.TokenURI}
                          target="_blank"
                        >
                          <small className="text-yellow-600 font-bold">
                            {tokenOverviewResponse?.TokenURI.slice(0, 15)}.....
                            {tokenOverviewResponse?.TokenURI.slice(16, 25)}
                          </small>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <Card title="📊 Community Sentiment " className="w-full">
                {/* {isError && <FallBackMessage />} */}

                {!connected ? (
                  <IsNotConnected />
                ) : (
                  <div>
                    {isError ? (
                      <IsSkeletonLoader />
                    ) : isError ? (
                      <FallBackMessage />
                    ) : (
                      <div>
                        {!isVoting ? (
                          <div className="flex imtes-center gap-3 flex-col text-center">
                            <div
                              className="bg-text-white bg-red-900 px-4 
                       cursor-pointer rounded py-5 font-bold font-semibol "
                              onClick={() => handlePromiseOnVote()}
                            >
                              Red Flag 🚩
                            </div>
                            <div
                              className="bg-text-white cursor-pointer bg-green-900 px-4 font-bold rounded py-5 font-semibol "
                              onClick={() => castTokenVote(true)}
                            >
                              Bullish 🚀
                            </div>
                          </div>
                        ) : (
                         <div className="text-center">
                          <h1 className="text-3xl">✋</h1>
                           <h1 className="align-center mt-1 font-bold text-center">
                            Voing in Progress
                          </h1>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>
          </div>

          <div className="flex  gap-4 flex-col md:flex-row mt-5 justify-between">
            <div className=" w-full md:w-[55%]">
              <Card title="🪙 Risk Analytics ">
                {/* {isError && <FallBackMessage />} */}
                {/* <FallBackMessage
                  description="Sorry cant load market data at the momemt"
                  refetchData={() => {}}
                /> */}
                <RiskAnalytics/>
              </Card>
            </div>

            <div className=" w-full md:w-[50%]">
              <Card title="🦈 Token Holders">
                {isLoading && <IsSkeletonLoader />}
                {isError && <FallBackMessage />}
                {tokenHoldersResponse && (
                  <div className="flex items-center flex-col justify-between w-full overflow-x-auto h-[300px]">
                    <div className="flex items-center justify-between w-full mb-4">
                      <h1 className="font-bold">Address</h1>
                      <h1 className="font-bold">Percentage</h1>
                      <h1 className="font-bold">Amount</h1>
                    </div>

                    {/* @ts-ignore */}
                    {tokenHoldersResponse?.map(
                      (value: ITokenHolders, index: number) => {
                        return (
                          <div
                            className="flex text-sm items-center justify-between w-full mt-3"
                            key={index}
                          >
                            <a
                              href={`https://solana.fm/address/${value?.address}`}
                              target="_blank"
                            >
                              <h1 className="font-semibold text-yellow-500 bg-gray-800 p-1 ">
                                {value?.address.slice(0, 4)}...
                                {value?.address.slice(-5)}
                              </h1>
                            </a>
                            <h1 className=" text-left">
                              {Number(value?.percentage).toFixed(3)}
                            </h1>{" "}
                            <h1 className="font-bold">
                              $ {numeral(value?.uiAmount).format("0, 0a")}
                            </h1>{" "}
                          </div>
                        );
                      },
                    )}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div> : <IsNotConnected/>
        }
    
      </div>
    </>
  );
};

export default PreviewTokenPage;
