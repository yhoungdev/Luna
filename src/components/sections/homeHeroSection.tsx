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
          className="w-full md:w-[40%] 
        mx-auto flex justify-center"
        >
          <div className="w-full">
            <div
              className="py-2 md:py-2 mx-auto  mb-5  flex items-center gap-3
					rounded-full bg-[#FFFFFF1A] w-[fit-content] px-3 md:px-[1.4em]"
            >
              <span className="bg-[#FFFFFF1A] hidden md:flex px-6 py-2 rounded-full  items-center">
                🎉
              </span>
              <p className="text-xs md:text-sm"> Check Token rugpull market</p>
            </div>
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
