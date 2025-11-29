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
        "px-5 h-[50px] md:h-[64px] border border-light-blue bg-[linear-gradient(178deg,#2dc5cf-10.25%,#02060F_54.76%,#2f858b_110.25%)] [box-shadow:0_0_28px_-8px_#0b6369] flex items-center justify-center text-white font-medium rounded-4xl hover:bg-[linear-gradient(178deg,#107c97_-10.25%,#0fe4e4_54.76%,#057da1_110.25%)] transition-all duration-1000 cursor-pointer text-[14px] md:text-base",
        className
      )}
    >
      {text}
    </button>
  );
};
