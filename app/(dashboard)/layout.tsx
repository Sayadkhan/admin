import DashboardComp from "@/components/dashboard/DashboardComp";
import "../globals.css";

import Sidebar from "@/components/dashboard/Sidebar";

export const metadata = {
  title: "Admin",
  description: "Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex text-black ">
      <div className="relative">
        <Sidebar />
      </div>

      <DashboardComp children={children} />
    </div>
  );
}
