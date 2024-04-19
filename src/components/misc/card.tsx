import React, { FC } from "react";

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Card: FC<ICardProps> = ({
  children,
  title,
  className,
  ...rest
}: ICardProps): React.JSX.Element => {
  const classData = `text-satoshi bg-transparet backdrop-blur-md 
    py-3 md:py-[2em] md:px-[3em] px-5 rounded-lg border-1 border-2  ${className}`;
  return (
    <div className={classData} {...rest}>
      {title && (
        <h1 className="text-white text-xl default-font font-semibold ">
          {title}
        </h1>
      )}
      <div className="py-5">{children}</div>
    </div>
  );
};

export default Card;
