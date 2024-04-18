import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isDisabled?: boolean;
  background?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  isDisabled = false,
  background = "var(--accent)",
  ...props
}): React.JSX.Element => {
  const classStyle = ` my-1 hover:bg-accent
     text-white 
     font-bold py-4 px-[2em] rounded-full 
    shadow-lg focus:outline-none focus:shadow-outline
    ${className || ""}`;
  return (
    <button
      onClick={onClick}
      className={classStyle}
      disabled={isDisabled}
      style={{
        cursor: isDisabled === true ? "not-allowed" : "pointer",
        backgroundColor: isDisabled ? "#4340408c" : background,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
