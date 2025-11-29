"use client";
import { Button } from "@/components/common/Button";
import FormInput from "@/components/form/FormInput";
import { Logo, PasswordIcon } from "@/svg/SvgContainer";

import { FormProvider, useForm } from "react-hook-form";

const page = () => {
  const methods = useForm();
  const { watch } = methods;
  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div className=" ![background-image:var(--bg-primary-linear)] w-full min-h-screen text-white flex items-center justify-center px-3 md:px-0">
      <div className="w-full max-w-[700px] h-auto md:h-[850px] rounded-3xl p-[1px] [background:var(--bg-border-linear)] ">
        <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl [background:var(--bg-secondary-linear)] py-[30px] px-[20px] md:px-[90px] ">
          <div className="flex flex-col items-center">
            <Logo />
            <h3 className="text-2xl md:text-4xl mt-2 md:mt-5">
              Create New Password
            </h3>
            <p className="text-xs md:text-base mt-2 md:mt-5 text-center">
              Your new password must be different form previously used password
            </p>
          </div>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full flex flex-col"
            >
              <FormInput
                type="password"
                name="password"
                label="New Password"
                placeholder="Enter Password"
                icon={<PasswordIcon />}
              />
              <FormInput
                type="password"
                name="confirm-password"
                label="Confirm New Password"
                placeholder="Enter Password"
                icon={<PasswordIcon />}
                rules={{
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }}
              />

              <Button
                type={"submit"}
                className={"w-full shrink-0 mt-[16px]"}
                text={"Save New Password"}
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default page;
