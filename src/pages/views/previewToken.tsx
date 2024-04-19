import { Header } from "../../components/layout/header";
import Card from "../../components/misc/card";
import FallBackMessage from "../../components/misc/fallbacks/isError";

const PreviewTokenPage = () => {
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
                <FallBackMessage />
              </Card>

              <Card title="📊 Risk Analytics " className="w-full">
                <FallBackMessage />
              </Card>
            </div>
          </div>

          <div className="mt-5">
            <Card title="🪙 Token Market">
              <FallBackMessage />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewTokenPage;
