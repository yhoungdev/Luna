import { FC } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import Typography from "../ui/typography";

const HomeHeroSection: FC = (): JSX.Element => {
  return (
    <div className="hero-grad">
      <div
        className="container h-[85vh] md:h-[90vh] 
   items-center justify-center 
        flex "
      >
        <div
          className="w-full md:w-[50%] 
        mx-auto flex justify-center"
        >
          <div className="w-full">
            <center>
              <Typography className="md:text-5xl">Rug Checker</Typography>

              <p className=" mt-3 text-lg md:text-2xl font-satoshi">
                Check Solana token markets
              </p>
            </center>

            <Input placeholder="Token Address" className="w-full" />
            <center>
              <Button className=" mt-4 w-full md:w-[400px] mx-auto">
                Check
              </Button>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;
