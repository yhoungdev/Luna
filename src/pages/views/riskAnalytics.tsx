import { FC } from "react"
import { axiosInstance } from "../../axiosInstance";



interface IProps {
    tokenAddress?: string
}
const RiskAnalytics: FC<IProps> = ({tokenAddress}): JSX.Element => {
  return (
    <div>RiskAnalytics</div>
  )
}

export default RiskAnalytics