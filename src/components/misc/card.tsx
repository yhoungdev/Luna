import React, { FC } from "react";

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  className?: string;
  withMore?: React.ReactNode;
}

const Card: FC<ICardProps> = ({
  children,
  title,
  className,
  withMore,
  ...rest
}: ICardProps): React.JSX.Element => {
  const classData = `text-satoshi bg-transparet backdrop-blur-md 
    py-3 md:py-[3em] md:px-[3em]  px-5 rounded-lg border-1 border-2  ${className}`;
  return (
    <div className={classData} {...rest}>
      {title && (
        <div className="flex items-center justify-between">
          <h1 className="text-white text-xl default-font font-semibold ">
            {title}
          </h1>

          <div>{withMore}</div>
        </div>
      )}
      <div className="py-5">{children}</div>
    </div>
  );
};

export default Card;
