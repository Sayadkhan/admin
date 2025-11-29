import Image from "next/image";

import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

const Topbar = () => {
  return (
    <div className={`  flex items-center justify-between `}>
      <div className="block md:hidden"></div>
      <div className="hidden md:flex items-center gap-4">
        <h1 className=" text-2xl lg:text-4xl">Welcome to Admin Dashboard </h1>
        <img
          className="w-[20px] h-[20px] lg:w-[34px] lg:h-[34px]"
          src="/handrise.png"
          alt=""
        />
      </div>

      <div className="flex   items-center gap-2.5">
        <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-[#00b7c8] flex items-center justify-center">
          <IoMdNotificationsOutline className="text-[14px] lg:text-[24px]" />
        </div>

        <div className="relative">
          <Image
            width={48}
            height={48}
            className="w-[35px] h-[35px] lg:w-[48px] lg:h-[48px] rounded-full object-cover"
            src={"/avatar.png"}
            alt="avatar"
          />
          <span className="absolute bottom-0 right-0 w-[10px] h-[10px] lg:w-[15px] lg:h-[15px] bg-green-500 border-2 lg:border-3 border-white rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
