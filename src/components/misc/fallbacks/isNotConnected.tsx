import { PiWalletLight } from "react-icons/pi";
import { ConnectWalletButton } from "../../ui/button";

const IsNotConnected = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center flex items-center flex-col">
        <h1 className="text-4xl mb-2 text-center">
          <PiWalletLight size={"1em"} color="white" />{" "}
        </h1>

        <h1 className="text-sm md:text-lg text-center">No Wallet Connected</h1>
        <small className="text-gray-400">Connect Wallet to Continue</small>
        <div className="mt-3">
          <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
        </div>
      </div>
    </div>
  );
};

export default IsNotConnected;
