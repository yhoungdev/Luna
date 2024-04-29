import { ConnectWalletButton } from "../ui/button";
import { FaBars } from "react-icons/fa";
import { PiWalletLight } from "react-icons/pi";
import Logo from "../misc/logo";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useWallet } from "@solana/wallet-adapter-react";

type HeaderProps = {
  title: string;
  path: string;
};

const headerUrl: HeaderProps[] = [
  // {
  //   title: "Home",
  //   path: "/",
  // },
  // {
  //   title: "Tokens",
  //   path: "/tokens",
  // },
  // {
  //   title: "Leaderboard",
  //   path: "/",
  // },
];

const SidePanel = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="bg-[#0e0e0eba] text-white fixed left-0 top-0 w-full h-full z-50">
      <div className="flex justify-end p-5">
        <h1
          className="cursor-pointer w-[40px] h-[40px] bg-gray-800 flex rounded-full
                text-xl items-center justify-center"
          onClick={onClose}
        >
          &times;
        </h1>
      </div>
      <div className="p-5 flex items-center text-center justify-center ">
        <ul>
          {headerUrl.map((data, index) => (
            <Link to={data.path}>
              <li
                key={index}
                className="cursor-pointer text-gray-400 my-2 py-5"
              >
                {data.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <center>
        <ConnectWalletButton>
          <div className="flex items-center gap-2">
            <PiWalletLight size={"1.5em"} /> Connect Wallet
          </div>
        </ConnectWalletButton>
      </center>
    </div>
  );
};

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { connected, disconnect } = useWallet();
  const wallet = useWallet(); 
  const getAddress = wallet.publicKey?.toString();



  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const disconnectWallet = () => disconnect();

  return (
    <>
      <div
        className="flex py-3
      container items-center gap-3 justify-between"
      >
        <div>
          <div>
            <Logo />
          </div>
        </div>

        <div className="hidden md:block">
          <ul className="flex items-center  gap-5">
            {headerUrl.map((data, key) => (
              <Link to={data.path} key={key}>
                <li
                  className="cursor-pointer text-gray-600 
              hover:text-white"
                >
                  {data.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div>
          <div className="hidden md:block">
            {connected ? (
              <div>
                <div
                  className="flex items-center gap-2 bg-gray-800
                   py-3 px-4 rounded-lg cursor-pointer"
                  onClick={disconnectWallet}
                >
                  <PiWalletLight size={"1.5em"} /> <small>{getAddress?.slice(0,4)}......{getAddress?.slice(4,9)}</small>
                </div>
              </div>
            ) : (
              <ConnectWalletButton>
                <div className="flex items-center gap-2">
                  <PiWalletLight size={"1.5em"} /> Connect Wallet
                </div>
              </ConnectWalletButton>
            )}
          </div>

          <span
            className="block md:hidden w-fit h-fit bg-white px-3 py-3 rounded-full
          cursor-pointer"
            onClick={toggleSidebar}
          >
            <FaBars color="black" />
          </span>
        </div>
      </div>
      {isSidebarOpen && <SidePanel onClose={closeSidebar} />}
    </>
  );
};
