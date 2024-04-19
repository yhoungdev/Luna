import { FC } from "react";

interface IFallbackProps {
    icon?: JSX.Element;
    title?: string;
    description?: string
}


const FallBackMessage: FC<IFallbackProps> = ({icon , title , description}): JSX.Element => {
  return (
    <div className="text-center">
      <h1 className="text-4xl mb-2">{icon || '😒'}</h1>

      <h1 className="text-sm md:text-lg text-center">{title || 'An Error Occured'}</h1>
        <small className="text-gray-400">{description}</small>
    </div>
  );
};

export default FallBackMessage;
