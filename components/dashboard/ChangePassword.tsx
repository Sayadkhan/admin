"use client";

import { Button } from "@/components/common/Button";
import SectionTItle from "@/components/dashboard/SectionTItle";
import FormInput from "@/components/form/FormInput";
import { PasswordIcon } from "@/svg/SvgContainer";
import { FormProvider, useForm } from "react-hook-form";

const ChangePassword = () => {
  const methods = useForm();
  const { watch, reset } = methods;
  const password = watch("password");
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleCancel = () => {
    reset();
  };
  return (
    <div className="flex flex-col mb-[38px]">
      np
      <SectionTItle
        title={"Change Password"}
        description={
          "Update your password regularly to keep your account secure. "
        }
      />
      <div className="h-auto w-full rounded-[36px] border flex flex-col gap-5 border-[#272727] bg-[#191919] py-[40px] px-[20px]">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full flex flex-col"
          >
            <FormInput
              type="password"
              name="current-password"
              label="Current Password"
              placeholder="Current Password"
              icon={<PasswordIcon />}
            />

            <div className="flex flex-col lg:flex-row gap-6">
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
            </div>
            <div className="flex lg:items-end w-full lg:justify-end">
              <div className="flex flex-col sm:flex-row items-center gap-2.5 lg:gap-5 w-full">
                <Button
                  className="w-full lg:w-[304px] mt-[24px] !bg-none !bg-transparent !shadow-none "
                  text="Cancel"
                  onClick={handleCancel}
                  type="button"
                />
                <Button
                  className="w-full lg:w-[304px] lg:mt-[24px]"
                  text="Save Changes"
                  type="submit"
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ChangePassword;
