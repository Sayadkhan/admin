"use client";

import {
  AITrainingIcon,
  CallIcon,
  DashboardIcon,
  Logo,
  SettingsIcon,
  SummeryIcon,
} from "@/svg/SvgContainer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NavData = [
  {
    id: 1,

    title: "Dashboard",
    pathname: "/dashboard",
  },

  // Banner Management
  {
    id: 2,

    title: "Banner Management",
    submenu: [
      { title: "Add New Banner", pathname: "/banner/add" },
      { title: "Change Image", pathname: "/banner/change-image" },
      { title: "Edit Title & Subtitle", pathname: "/banner/edit-title" },
      { title: "Description", pathname: "/banner/description" },
      { title: "Enable / Disable", pathname: "/banner/status" },
      { title: "Sliders", pathname: "/banner/sliders" },
    ],
  },

  // Club Management
  {
    id: 3,

    title: "Club Management",
    submenu: [
      { title: "Add Club", pathname: "/clubs/add" },
      { title: "Edit Details", pathname: "/clubs/edit" },
      { title: "Delete / Disable", pathname: "/clubs/delete" },
      { title: "Location", pathname: "/clubs/location" },
      { title: "Category", pathname: "/clubs/category" },
      { title: "Tags", pathname: "/clubs/tags" },
      { title: "Logo", pathname: "/clubs/logo" },
      { title: "Gallery", pathname: "/clubs/gallery" },
      { title: "Benefits", pathname: "/clubs/benefits" },
      { title: "Features", pathname: "/clubs/features" },
      { title: "Short Description", pathname: "/clubs/short-desc" },
      { title: "Long Description", pathname: "/clubs/long-desc" },
      { title: "Contact Info", pathname: "/clubs/contact" },
      { title: "Social Links", pathname: "/clubs/social" },
      { title: "Status", pathname: "/clubs/status" },
    ],
  },

  // Accommodation
  {
    id: 4,

    title: "Accommodation",
    submenu: [
      { title: "Add Room Type", pathname: "/accommodation/add" },
      { title: "Edit Room Type", pathname: "/accommodation/edit" },
      { title: "Delete Room Type", pathname: "/accommodation/delete" },
      { title: "Room Images", pathname: "/accommodation/images" },
      { title: "Amenities", pathname: "/accommodation/amenities" },
      { title: "Pricing", pathname: "/accommodation/pricing" },
    ],
  },

  // User Management
  {
    id: 5,

    title: "User Management",
    submenu: [
      { title: "All Users", pathname: "/users" },
      { title: "Edit User", pathname: "/users/edit" },
      { title: "Block / Unblock", pathname: "/users/status" },
      { title: "Reset Password", pathname: "/users/reset-password" },
      { title: "Activity History", pathname: "/users/activity" },
    ],
  },

  // Premium Members
  {
    id: 6,

    title: "Premium Members",
    submenu: [
      { title: "All Members", pathname: "/premium" },
      { title: "Approve Request", pathname: "/premium/approve" },
      { title: "Reject Request", pathname: "/premium/reject" },
      { title: "Membership Form", pathname: "/premium/form" },
      { title: "Edit Status", pathname: "/premium/status" },
      { title: "Upgrade Manually", pathname: "/premium/upgrade" },
      { title: "Download Data", pathname: "/premium/download" },
      { title: "Filter Members", pathname: "/premium/filter" },
    ],
  },

  // Membership Forms
  {
    id: 7,

    title: "Membership Forms",
    submenu: [
      { title: "View Submissions", pathname: "/forms" },
      { title: "Add Field", pathname: "/forms/add-field" },
      { title: "Edit Field", pathname: "/forms/edit-field" },
      { title: "Delete Field", pathname: "/forms/delete-field" },
      { title: "Export Data", pathname: "/forms/export" },
    ],
  },

  // Offers & Coupons
  {
    id: 8,

    title: "Offers & Coupons",
    submenu: [
      { title: "Create Offer", pathname: "/offers/create" },
      { title: "Create Coupon", pathname: "/offers/coupon" },
      { title: "Edit Offer", pathname: "/offers/edit" },
      { title: "Set Expiry", pathname: "/offers/expiry" },
      { title: "Delete Offer", pathname: "/offers/delete" },
    ],
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const toggleMenu = (id: number) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div
      className={` fixed ${
        collapsed ? "left-0" : "-left-[250px]"
      } xl:static bg-[#fff] border-r border-gray-300 py-8    transition-all z-50 duration-300`}
    >
      {/* Mobile Expand/Collapse Buttons */}
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="xl:hidden absolute cursor-pointer -right-8 top-5 -translate-y-1/2 shadow-md h-8 w-8 bg-light-blue rounded-full flex items-center justify-center"
        >
          <FaChevronLeft className="text-xl" />
        </button>
      ) : (
        <button
          onClick={() => setCollapsed(true)}
          className="xl:hidden absolute cursor-pointer -right-8 top-5 -translate-y-1/2 shadow-md h-8 w-8 bg-light-blue rounded-full flex items-center justify-center"
        >
          <FaChevronRight className="text-xl" />
        </button>
      )}

      {/* logo */}
      <h3 className="text-3xl font-bold  mb-5 px-4">Admin</h3>

      <ul className="w-full flex flex-col scroll-bar px-4 h-[calc(100vh-120px)] gap-4 overflow-y-auto">
        {NavData.map((item) => {
          const parentActive =
            pathname.startsWith(item.pathname || "") ||
            item?.submenu?.some((s) => pathname.startsWith(s.pathname));

          return (
            <li key={item.id} className="w-full">
              {/* Parent Button */}
              <button
                onClick={() => (item.submenu ? toggleMenu(item.id) : null)}
                className={`px-4 text-sm md:text-base py-4 flex items-center justify-between  w-full bg-gray-200 rounded-[8px] ${
                  parentActive ? "border-l-[3px] border-blue-500" : ""
                }`}
              >
                <span className="flex items-center gap-2">{item.title}</span>

                {item.submenu && (
                  <FaChevronRight
                    className={`transition-transform ${
                      openMenu === item.id ? "rotate-90" : ""
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {item.submenu && openMenu === item.id && (
                <ul className="ml-8 mt-2 flex flex-col gap-1">
                  {item.submenu.map((sub, idx) => (
                    <Link
                      key={idx}
                      href={sub.pathname}
                      className={`py-2 px-3 text-sm rounded-md ${
                        pathname === sub.pathname
                          ? "bg-blue-500 text-white font-semibold"
                          : "text-black hover:bg-gray-200"
                      }`}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
