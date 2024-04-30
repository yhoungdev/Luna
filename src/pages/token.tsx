import { Header } from "../components/layout/header";
// import Card from "../components/misc/card";
// import FallBackMessage from "../components/misc/fallbacks/isError";
import { CHECKEDICON, DUSTICON } from "../constants";

const trash = DUSTICON;
const correct = CHECKEDICON;

const TokensPage = () => {
  return (
    <>
      <Header />
      <div className="w-full h-full py-[5em] ">
        <div className="container">
          <div className="flex  justify-center={'center'} md:col gap-3">
            <div className="w-full">
              <h1 className="mb-5">TOKEN VOTES</h1>

              <div className="flex items-center  flex-col md:flex-row justify-between w-full  gap-5">
                <div className="flex items-center justify-between w-full md:w-[50%] justif">
                  <div className="rounded-full w-[50px]  h-[50px] bg-gray-600"></div>
                  <div className="flex  ites-center gap-3">
                    {/* <progress value={'30'} className="rounded-full bg-gray"/> */}
                    <div className={`bg-slate-800 rounded-xl p-2`}>
                      <h1 className="text-2xl">{trash}</h1>
                    </div>
                    <h1 className="text-3xl">⚖️</h1>

                    <div className={`bg-slate-800 rounded-xl p-2`}>
                      <h1 className="text-2xl">{correct}</h1>
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center justify-between w-full md:w-[50%] bg-slate-800
                  py-5 px-5 rounded-xl text-center"
                >
                  <h1 className="font-semibold text-xl mx-auto">
                    {" "}
                    For An Project
                  </h1>

                  <div className="py-5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokensPage;
