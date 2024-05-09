/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useState, useEffect, FormEventHandler } from "react";
import { Header } from "../../components/layout/header";
import Card from "../../components/misc/card";
import FallBackMessage from "../../components/misc/fallbacks/isError";
import { useQuery } from "@tanstack/react-query";
import {
  CommentProps,
  ICommunitySentiment,
  ITokenHolders,
  ITokenOverview,
  TokenOverviewResult,
} from "../../interface";
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";
import numeral from "numeral";
import IsSkeletonLoader from "../../components/misc/fallbacks/isSkeletonLoading";
import { axiosInstance } from "../../axiosInstance";
import IsNotConnected from "../../components/misc/fallbacks/isNotConnected";
import RiskAnalytics from "./riskAnalytics";
import GetTokenOverview from "./tokenOverview";
import { CHECKEDICON, DUSTICON } from "../../constants";
import MarketsViews from "./marketsView";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "../../components/popups/modal";
import { AiOutlineComment } from "react-icons/ai";
import Button from "../../components/ui/button";
import supabase from "../../utils/supabase";
import ViewComments from "./viewComments";
import Drawer from "../../components/layout/drawer";

const PreviewTokenPage = () => {
  const [isVoting, setIsVoting] = useState<false>(false);
  const searchParams: string = window.location.search.split("=")[1];
  const { connected } = useWallet();
  const walletAddress = useWallet().publicKey?.toString();
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isCommentPresent, setIsCommentPresent] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onOpenAddCommentModal = () => setIsAddOpen(true);
  const closeAddCommentModal = () => setIsAddOpen(false);

  const fetchAllRequest = async () => {
    const requests = [
      axiosInstance.get<ITokenHolders>(
        `/v3/token-holders/?token=${searchParams}`,
      ),
      axiosInstance.get<ITokenOverview>(`/v3/token/${searchParams}`),
      axiosInstance.get<ICommunitySentiment>(`/sentiment/${searchParams}`),
    ];

    const results = await Promise.allSettled(requests);

    const tokenHolders =
      results[0].status === "fulfilled" ? results[0].value.data : null;
    const tokenOverview =
      results[1].status === "fulfilled" ? results[1].value.data : null;
    const communitySentiment =
      results[2].status === "fulfilled" ? results[2].value.data : null;

    return {
      tokenHolders: tokenHolders,
      tokenOverview: tokenOverview,
      communitySentiment: communitySentiment,
    };
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetch-all-token-utils"],
    queryFn: fetchAllRequest,
  });

  const tokenOverviewResponse = data?.tokenOverview;
  const tokenHoldersResponse = data?.tokenHolders;
  const sentimentResponse: ICommunitySentiment = data?.communitySentiment;

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

  const sentimentCheck = sessionStorage.getItem("sentimentCheck") === "true";

  useEffect(() => {
    document.title = `${tokenOverviewResponse?.Name || "Token Overview"}`;
  });

  const tokenOverviewResult: TokenOverviewResult =
    tokenOverviewResponse?.result;
  const tokenContent = tokenOverviewResult?.content;

  const [commentData, setCommentData] = useState<string>("");
  const handleComment = async (event: FormEventHandler<HTMLFormElement>) => {
    const payload = {
      wallet_address: walletAddress,
      token_address: searchParams,
      comment: commentData,
    };
    event.preventDefault();
    const { error } = await supabase.from("token_comments").insert(payload);
    if (error) return toast.error("Error inserting comment");
    toast.success("Comment added successfully");
    setIsAddOpen(false);
  };

  const handleFormChange = (event: FormEventHandler<HTMLFormElement>) => {
    const value = event.target.value;
    setCommentData(value);
  };

  const [comments, setComments] = useState<CommentProps>();
  const fetchTokenComments = async () => {
    const { data, error } = await supabase
      .from("token_comments")
      .select()
      .eq("token_address", searchParams);

    if (error) {
      console.error("Error fetching comments:", error);
      return;
    }
    setComments(data);
    checkUserCommentPresence(data);
  };

  const checkUserCommentPresence = (comments) => {
    const userCommentExists = comments.some(
      (comments: CommentProps) => comments.wallet_address === walletAddress,
    );
    setIsCommentPresent(userCommentExists);
  };

  useEffect(() => {
    fetchTokenComments();
  }, [searchParams, checkUserCommentPresence]);

  const ViewCommentCaller = () => (
    <div className="flex  w-[180px] items-center gap-2 text-white bg-gray-800 rounded-md px-2 py-2 cursor-pointer">
      👀
      <small>All Comments</small>
      <span class="inline-flex  justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
        {comments?.length}
      </span>
    </div>
  );

  return (
    <>
      <Header />
      <div className="w-full h-full ">
        <div className="container py-[1em]">
          <div className="flex  justify-between w-full flex-wrap gap-2">
            <h1 className="gradient-text text-2xl md:text-4xl w-full md:w-[30%]">
              {isLoading && <IsSkeletonLoader count={1} />}
              {isError && "Failed to Load Name"}
              <div>
                {data && (
                  <img
                    src={tokenContent?.files[0]?.cdn_uri}
                    width={50}
                    height={80}
                  />
                )}
                <h1 className="mt-1">{data && tokenContent?.metadata?.name}</h1>
              </div>
            </h1>

            <div className="flex  gap-3 ">
              {connected && (
                <>
                  {!isCommentPresent && (
                    <div
                      className="flex  w-full h-fit items-center  gap-2 text-white bg-gray-800 rounded-md px-2 py-2 cursor-pointer"
                      onClick={onOpenAddCommentModal}
                    >
                      <AiOutlineComment size={"1.5em"} />
                      <small>Comment </small>
                    </div>
                  )}
                </>
              )}

              <Drawer actionBlock={<ViewCommentCaller />}>
                <ViewComments
                  ownComment={isCommentPresent}
                  data={comments}
                  tokenAddress={searchParams}
                />
              </Drawer>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-col md:flex-row  gap-5 md:gap-[2em] w-full">
              <Card
                title="📦 Token Overview"
                className="w-full"
                withMore={
                  data && (
                    <FaInfoCircle cursor={"pointer"} onClick={openModal} />
                  )
                }
              >
                <GetTokenOverview
                  address={searchParams}
                  tokenData={tokenOverviewResult}
                />
              </Card>

              <Card title="✅   Community Sentiment " className="w-full">
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
                        <div className="text-center">
                          <h1
                            className="my-2 text-4xl bg-gray-800 p-3 w-fit 
                               rounded-xl mx-auto"
                          >
                            {sentimentCheck ? DUSTICON : CHECKEDICON}
                          </h1>
                          <h4
                            className={`${sentimentCheck ? "text-red-500 " : "text-green-500"} font-bold text-sm mb-3 `}
                          >
                            {sentimentCheck ? "TRASH" : "GOOD"}
                          </h4>
                        </div>
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

          <div className="flex  h-full  gap-4 flex-col md:flex-row mt-5 justify-between">
              
            <div className=" w-full md:w-[55%] ">
              <Card title="🪙 Risk Analytics " className="h-full">
                <RiskAnalytics
                  tokenSentiment={sentimentResponse?.sentimentScore}
                  tokenHoldersResponse={tokenHoldersResponse}
                  tokenAddress={searchParams}
                />
              </Card>
            </div>

            <div className=" w-full md:w-[50%]">
              <Card title="🦈 Token Holders">
                {isLoading && <IsSkeletonLoader />}
                {isError && <FallBackMessage />}
                {tokenHoldersResponse && (
                  <div className="flex flex-col  justify-between w-full overflow-x-auto h-[300px]">
                    <div className="flex  justify-between w-full mb-4">
                      <h1 className="font-bold flex-1 text-left pl-4">
                        Address
                      </h1>
                      <h1 className="font-bold flex-1 text-left">Percentage</h1>
                      <h1 className="font-bold flex-1 text-left">Amount</h1>
                    </div>

                    {/* @ts-ignore */}
                    {tokenHoldersResponse?.map(
                      (value: ITokenHolders, index: number) => {
                        return (
                          <div
                            className="flex text-sm  w-full mt-3 text-left"
                            key={index}
                          >
                            <a
                              href={`https://solana.fm/address/${value?.address}`}
                              target="_blank"
                              className="flex-1"
                            >
                              <h1 className="font-semibold text-yellow-500 bg-gray-800 p-1 w-fit px-3">
                                {value?.address.slice(0, 4)}...
                                {value?.address.slice(-5)}
                              </h1>
                            </a>
                            <h1 className="text-left flex-1">
                              {Number(value?.percentage).toFixed(2)} %
                            </h1>
                            <h1 className="font-bold flex-1">
                              {numeral(value?.uiAmount).format("0,0a")}
                            </h1>
                          </div>
                        );
                      },
                    )}
                  </div>
                )}
              </Card>
            </div>
          </div>

          <div className="mt-3">
            <Card title="📊 Markets">
              <MarketsViews address={searchParams} />
            </Card>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpen={openModal}
        header={tokenContent?.metadata?.name ?? ""}
        closeModal={closeModal}
      >
        <p className="text-gray-800 text-sm">
          {tokenOverviewResponse?.result?.content?.metadata?.description}
        </p>
      </Modal>

      <Modal
        isOpen={isAddOpen}
        onOpen={onOpenAddCommentModal}
        closeModal={closeAddCommentModal}
        header="Add Comment"
      >
        <div className="text-black">
          <form
            action=""
            className="mt-4 flex flex-col gap-2"
            onSubmit={handleComment}
          >
            <textarea
              type="text"
              placeholder="Add Comment"
              className="border bg-white outline-none
                text-gray-500 px-2 py-2 rounded-md outline-green-500"
              onChange={(e) => handleFormChange(e)}
              required
            />
            <Button className="mt-2">  Comment</Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default PreviewTokenPage;
