"use client";

import React from "react";

import FormInput from "@/components/form/FormInput";
import { EmailIcon, Logo, PasswordIcon } from "@/svg/SvgContainer";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";

// -----------------------------
// 🔵 Define Form Types
// -----------------------------
interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Page: React.FC = () => {
  const methods = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log("Form Data:", data);
    router.push("/dashboard");
  };

  return (
    <div className=" ![background-image:var(--bg-primary-linear)] w-full min-h-screen text-white flex items-center justify-center px-3 md:px-0">
      <div className="w-full max-w-[700px] h-auto rounded-3xl p-[1px] [background:var(--bg-border-linear)]">
        <div className="w-full h-full flex flex-col items-center rounded-3xl [background:var(--bg-secondary-linear)] py-[15px] md:py-[30px] px-[20px] md:px-[90px]">
          {/* Title */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl md:text-4xl mt-2 md:mt-5">Welcome back!</h3>
            <p className="text-xs md:text-base mt-2 md:mt-5">
              Sign in to access your resumes and tools
            </p>
          </div>

          {/* Form */}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full flex flex-col"
            >
              <FormInput
                type="email"
                name="email"
                label="Email"
                placeholder="Enter Email"
                icon={<EmailIcon />}
              />

              <FormInput
                type="password"
                name="password"
                label="Password"
                placeholder="Enter Password"
                icon={<PasswordIcon />}
              />

              <div className="flex justify-between items-center w-full mt-[17px] md:mt-[24px]">
                <label
                  htmlFor="checkbox-1"
                  className="relative flex items-center space-x-2 cursor-pointer mb-[10px]"
                >
                  <input
                    type="checkbox"
                    id="checkbox-1"
                    {...methods.register("rememberMe", { required: true })}
                    className="peer relative appearance-none w-[16px] h-[16px] md:w-[20px] md:h-[20px] border border-light-blue rounded-[6px]"
                  />
                  <span className="absolute left-[4px] text-light-blue text-[10px] md:text-[14px] opacity-0 pointer-events-none peer-checked:opacity-100">
                    <FaCheck />
                  </span>
                  <span className="text-[14px] md:text-[16px] font-[400] text-[rgba(255,255,255,0.70)]">
                    Remember me
                  </span>
                </label>

                <Link
                  className="inline-block text-[14px] md:text-base"
                  href={"/auth/forget_password"}
                >
                  Forgot Password?
                </Link>
              </div>

              {methods.formState.errors.rememberMe && (
                <span className="text-red-500 text-sm">
                  Remember Me is required
                </span>
              )}

              <Button
                className="w-full mt-[17px] md:mt-[24px]"
                text="Login"
                type="submit"
              />
            </form>
          </FormProvider>

          {/* Google Button */}
          <span className="mt-[18px] md:mt-[25px] text-[14px] md:text-base">
            Or Continue with
          </span>

          <button className="bg-[#141624] shrink-0 cursor-pointer h-[50px] md:h-[64px] w-[175px] rounded-4xl text-2xl flex items-center justify-center mt-[24px]">
            <FcGoogle />
          </button>

          {/* Bottom Link */}
          <span className="mt-[18px] md:mt-[25px] text-[14px] md:text-base">
            Don’t have an account?{" "}
            <Link
              className="text-light-blue hover:underline"
              href={"/auth/register"}
            >
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
