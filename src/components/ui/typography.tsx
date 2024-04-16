import React, { HTMLAttributes, ReactNode } from "react";

interface ITypographyProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

const Typography: React.FC<ITypographyProps> = ({
  children,
  className,
  ...props
}): React.JSX.Element => {
  const defaultClassName = `gradient-text text-4xl font-bold ${className}`;
  return (
    <h1 className={defaultClassName} {...props}>
      {children}
    </h1>
  );
};

export default Typography;
