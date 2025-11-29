"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { useFormContext, RegisterOptions, FieldError } from "react-hook-form";

interface FormInputProps {
  label: string;
  type: string;
  icon?: ReactNode;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
  disabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  icon,
  name,
  placeholder,
  rules = {},
  disabled = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const pathname = usePathname();
  const error: FieldError | undefined = errors[name] as FieldError;

  return (
    <div className="w-full mt-[24px]">
      <div className="flex flex-col gap-4">
        <label className="text-sm md:text-base" htmlFor={name}>
          {label}
        </label>

        {/* Input Field */}
        <div className="input-container w-full relative">
          {icon && (
            <span className="absolute top-1/2 left-5 -translate-y-1/2">
              {icon}
            </span>
          )}

          <input
            type={type}
            id={name}
            {...register(name, { required: `${label} is required`, ...rules })}
            className={`py-5 px-12 h-[45px] md:h-[64px] focus:outline-light-blue rounded-[36px] w-full ${
              "/" + pathname.split("/")[1] === "/settings"
                ? "bg-[#0e0e10] placeholder:text-[#909090]"
                : "bg-[#141624] placeholder:text-gray"
            } focus:outline disabled:bg-[#272727] disabled:cursor-not-allowed`}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <span className="text-red-500 text-sm inline-block mt-2.5">
          {error.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default FormInput;
