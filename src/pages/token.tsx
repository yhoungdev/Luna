import { Header } from "../components/layout/header";
// import Card from "../components/misc/card";
import FallBackMessage from "../components/misc/fallbacks/isError";

const TokensPage = () => {
  return (
    <>
      <Header />
      <div className="w-full h-full py-[5em] ">
          <FallBackMessage title="Failed to Load Tokens"
            description="Trying to Load Tokens please wait..."/>
      </div>
    </>
  );
};

export default TokensPage;
