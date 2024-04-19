/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import Typography from "../ui/typography";
import {useNavigate} from '@tanstack/react-router'

const HomeHeroSection: FC = (): JSX.Element => {

  const navigate = useNavigate({from: '/'});

  //@ts-ignore
  const [ tokenAddress , setTokenAddress] = useState<string>("");

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAddress(e.target.value.trim());
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({
      to: "/check-token",
      params:{}
     })

  }

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

            <form onSubmit={handleSubmit}>
            <Input placeholder="Token Address" 
              className="w-full" required 
              onChange={value => handleAddressChange(value)}/>
            <center>
              <Button type="submit" className=" mt-4 w-full md:w-[400px] mx-auto">
                Check
              </Button>
            </center>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;
