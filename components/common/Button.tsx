import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        "px-5 h-[50px] md:h-[64px] border border-light-blue bg-blue-600 flex items-center justify-center text-white font-medium rounded-4xl hover:bg-blue-700 transition-all duration-1000 cursor-pointer text-[14px] md:text-base",
        className
      )}
    >
      {text}
    </button>
  );
};
