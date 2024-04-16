import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  className,
  ...props
}: InputProps) => {
  const classProps = `border-4 border-gray outline-none
        mt-2  text-white py-3  text-[#586283]
		 px-5 ${className}`;
  return (
    <div className="mt-4">
      <label htmlFor="">{label}</label>
      <div>
        <input
          type={type}
          className={classProps}
          style={{
            backgroundColor: "transparent",
            
          }}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
