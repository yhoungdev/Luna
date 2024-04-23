import { FC } from "react";
import Button from "../../ui/button";

interface IFallbackProps {
  icon?: JSX.Element;
  title?: string;
  description?: string;
  refetchData?: () => void
}

const FallBackMessage: FC<IFallbackProps> = ({
  icon,
  title,
  description,
  refetchData
}): JSX.Element => {
  return (
    <div className="text-center">
      <h1 className="text-4xl mb-2">{icon || "😒"}</h1>

      <h1 className="text-sm md:text-lg text-center">
        {title || "An Error Occured"}
      </h1>
      <small className="text-gray-400">{description}</small>
      {
        refetchData && <center>
        <Button className="py-[9px] mt-4" onClick={refetchData}>Relpoad</Button>
      </center>
      }
    </div>
  );
};

export default FallBackMessage;
