"use client";

import { Button } from "@/components/common/Button";
import { Logo } from "@/svg/SvgContainer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
const ForgetPassword = ({ slug }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { otp: "" },
  });

  const router = useRouter();
  const [counter, setCounter] = useState(0);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  const onSubmit = (data) => {
    console.log("OTP submitted:", data.otp);
    router.push(`/auth/forget_password/${slug}/create_password`);
  };

  const handleResend = () => {
    if (counter === 0) {
      setIsResending(true);

      setTimeout(() => {
        console.log("OTP resent");
        setCounter(60);
        setIsResending(false);
      }, 1500);
    }
  };

  const decodedEmail = Buffer.from(slug, "base64").toString("utf-8");

  console.log(decodedEmail);

  return (
    <div className=" ![background-image:var(--bg-primary-linear)] w-full min-h-screen text-white flex items-center justify-center  px-3 md:px-0">
      <div className="w-full  md:max-w-[700px] h-auto md:h-[800px] rounded-3xl p-[1px]  [background:var(--bg-border-linear)]">
        <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl [background:var(--bg-secondary-linear)] py-[30px] px-[20px] md:px-[90px]">
          <div className="flex flex-col items-center">
            <Logo />
            <h3 className="text-2xl md:text-4xl mt-2 md:mt-5">
              Enter OTP Code
            </h3>
            <p className="text-xs md:text-base mt-2 md:mt-5 text-center">
              Your verification code is on its way! Check your inbox and enter
              the code below to reset your password.
            </p>
          </div>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-[30px] md:mt-[58px] flex flex-col gap-[10px]">
              <label htmlFor="otp">Enter the code</label>
              <Controller
                name="otp"
                control={control}
                rules={{
                  required: "OTP is required",
                  minLength: { value: 6, message: "OTP must be 6 digits" },
                }}
                render={({ field }) => (
                  <>
                    <OTPInput
                      {...field}
                      value={field.value || ""}
                      onChange={field.onChange}
                      numInputs={6}
                      renderInput={(props) => <input {...props} />}
                      containerStyle="flex items-center justify-center gap-4 md:gap-6 flex-wrap"
                      inputStyle="!w-[55px] !h-[55px] md:!w-[64px] md:!h-[64px] border-none bg-dark rounded-full text-lg md:text-xl lg:text-3xl font-medium focus:outline focus:outline-light-blue"
                    />
                    {errors.otp && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.otp.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <Button
              type={"submit"}
              className={"w-full shrink-0 mt-[20px] md:mt-[40px]"}
              text={"Verify"}
            />
          </form>

          <div className="mt-[16px] flex flex-col items-center">
            {counter > 0 ? (
              <span>You can resend the code in {counter} seconds</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-light-blue hover:underline text-[14px] md:text-base"
              >
                {isResending ? "Resending..." : "Resend Code"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
