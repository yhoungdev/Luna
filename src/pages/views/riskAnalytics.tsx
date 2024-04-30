import { FC } from "react";
import { axiosInstance } from "../../axiosInstance";

const shit = "🗑️";
const check = "✅";

interface IProps {
  tokenAddress?: string;
}
const RiskAnalytics: FC<IProps> = ({ tokenAddress }): JSX.Element => {
  return (
    <div className="text-center">
      <h1
        className="my-2 text-4xl bg-gray-800 p-3 w-fit 
            rounded-xl mx-auto"
      >
        {shit}
      </h1>
      <div className="border-2 border-red-500 py-4 ">GOOD</div>
    </div>
  );
};

export default RiskAnalytics;
