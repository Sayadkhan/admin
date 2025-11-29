"use client";
import React from "react";
import Topbar from "./Topbar";

const DashboardComp = ({ children }) => {
  return (
    <div
      className={`flex-1 bg-[#141416] h-[100vh] scroll-bar overflow-y-auto
      } `}
    >
      <div className="px-[20px] py-[24px]  md:py-[40px] md:px-[34px]">
        <Topbar />
      </div>

      <div className="px-[20px]  md:px-[34px] h-full">{children}</div>
    </div>
  );
};

export default DashboardComp;
