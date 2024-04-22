import { axiosInstance } from "../../axiosInstance";
import { Header } from "../../components/layout/header";
import Card from "../../components/misc/card";
import FallBackMessage from "../../components/misc/fallbacks/isError";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import Button from "../../components/ui/button";

const PreviewTokenPage = () => {
  async function fetchTokenData() {
    const { data } = await axiosInstance("/api/token/preview");
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { data, isLoading, isError } = useQuery({
    queryKey: ["token-information"],
    queryFn: fetchTokenData,
  });


  const handleVote = async() => {
    return <>
    
    </>
  }

  return (
    <>
      <Header />
      <div className="w-full h-full ">
        <div className="container py-[1em]">
          <div className="flex items-center justify-between">
            <h1 className="gradient-text text-2xl md:text-4xl">Solana</h1>
          </div>

          <div className="mt-4">
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-[2em] w-full">
              <Card title="📦 Token Overview" className="w-full">
                {isError && <FallBackMessage />}

                {/* {isLoading && <Skeleton />} */}
                <div className="flex  ites-center gap-3">
                  {/* <progress value={'30'} className="rounded-full bg-gray"/> */}
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex items-center justify-between w-full">
                      <h1 className="font-bold">Mint</h1> <h1>4k</h1>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h1 className="font-bold">Supply</h1> <h1>4k</h1>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <h1 className="font-bold">Market Cap</h1>{" "}
                      <h1 className="text-yellow-600 font-bold">$4k</h1>
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

          <div className="mt-5">
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
        </div>
      </div>
    </>
  );
};

export default PreviewTokenPage;
