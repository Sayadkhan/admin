"use client";

import { Button } from "@/components/common/Button";
import FormInput from "@/components/form/FormInput";
import { EmailIcon, Logo, PasswordIcon } from "@/svg/SvgContainer";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";

const page = () => {
  const methods = useForm();
  const router = useRouter();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    const encodedEmail = Buffer.from(data.email).toString("base64");
    router.push(`/auth/forget_password/${encodedEmail}`);
  };
  return (
    <div className=" ![background-image:var(--bg-primary-linear)] w-full min-h-screen text-white flex items-center justify-center px-3 md:px-0">
      <div className="w-full max-w-[700px] h-auto md:h-[800px] rounded-3xl p-[1px] [background:var(--bg-border-linear)]">
        <div className="w-full h-full flex flex-col items-center justify-center  rounded-3xl [background:var(--bg-secondary-linear)] py-[30px] px-[20px] md:px-[90px]">
          <div className="flex flex-col items-center ">
            <h3 className="text-2xl md:text-4xl mt-2 md:mt-5">
              Forget Password
            </h3>
            <p className="text-xs md:text-base mt-2 md:mt-5 text-center">
              Forgot your password? Just enter your registered email, and we’ll
              send you a one-time code to reset it securely.
            </p>
          </div>
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
              <Button
                className="w-full mt-[17px] md:mt-[24px]"
                text="Send OTP Code"
                type="submit"
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default page;
