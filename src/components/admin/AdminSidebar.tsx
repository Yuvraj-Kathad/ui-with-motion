"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("Loading...");
  const [adminName, setAdminName] = useState("Loading...");

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAdminEmail(user.email || "Admin User");
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Admin";
        setAdminName(fullName);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const navItems = [
    {
      label: "Components",
      href: "/admin/components",
      icon: <LayoutGrid className="w-5 h-5" />,
    }
  ];

  return (
    <div className="bg-white border-[#d7dadc] border-r border-solid flex flex-col justify-between items-start relative w-[240px] h-screen shrink-0">
      <div className="flex flex-col gap-[28px] items-start relative shrink-0 w-full">
        {/* Logo Section */}
        <div className="flex flex-col gap-[12px] items-start pt-[24px] px-[24px] relative shrink-0 w-full">
          <Link href="/admin" className="h-[74px] relative shrink-0 w-[111px] block">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img 
                alt="UX With Motion" 
                className="absolute h-[196.4%] left-[-15.45%] max-w-none top-[-48.2%] w-[130.89%]" 
                src="/icons/admin-logo.png" 
              />
            </div>
          </Link>
          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <img alt="divider" className="block max-w-none size-full" src="/icons/admin-line.svg" />
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col w-full">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-start justify-center overflow-clip px-[24px] py-[12px] relative shrink-0 w-full transition-colors ${
                  isActive ? "bg-[#ffcea2]" : "bg-white hover:bg-[#ffcea2]/30"
                }`}
              >
                <div className="flex gap-[12px] items-center justify-center relative shrink-0">
                  <div className="relative shrink-0 size-[24px]">
                    <div className="absolute inset-0 overflow-clip">
                      <div className="absolute inset-[0.03%_0] flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`size-full transition-colors ${isActive ? 'text-[#c05d00]' : 'text-[#1f2123]'}`}>
                          <path d="M12 1.5L16.5 6L12 10.5L7.5 6L12 1.5Z" fill="currentColor" />
                          <path d="M12 13.5L16.5 18L12 22.5L7.5 18L12 13.5Z" fill="currentColor" />
                          <path d="M22.5 12L18 16.5L13.5 12L18 7.5L22.5 12Z" fill="currentColor" />
                          <path d="M10.5 12L6 16.5L1.5 12L6 7.5L10.5 12Z" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className={`[word-break:break-word] font-sans font-medium leading-[1.2] relative shrink-0 text-[16px] text-center whitespace-nowrap ${
                    isActive ? "text-[#c05d00]" : "text-[#1f2123]"
                  }`}>
                    {item.label}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-[24px] items-start pb-[24px] px-[24px] relative shrink-0 w-full">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-white flex flex-col items-start justify-center overflow-clip py-[12px] relative shrink-0 w-full hover:opacity-70 transition-opacity"
        >
          <div className="flex gap-[12px] items-center justify-center relative shrink-0">
            <div className="overflow-clip relative shrink-0 size-[24px]">
              <div className="absolute inset-[12.5%]">
                <div className="absolute inset-[-4.17%]">
                  <img alt="logout" className="block max-w-none size-full" src="/icons/admin-logout.svg" />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-sans font-medium leading-[1.2] relative shrink-0 text-[#1f2123] text-[16px] text-center whitespace-nowrap">
              Logout
            </p>
          </div>
        </button>

        {/* Divider */}
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="divider" className="block max-w-none size-full" src="/icons/admin-line.svg" />
          </div>
        </div>

        {/* User Profile */}
        <div className="flex gap-[12px] items-center relative shrink-0 w-full">
          <div className="relative shrink-0 size-[50px] overflow-hidden rounded-full">
            <img alt="avatar" className="absolute block inset-0 max-w-none size-full object-cover" src="/icons/admin-avatar.png" />
          </div>
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col items-start leading-[1.2] min-w-px relative whitespace-nowrap">
            <p className="font-sans font-medium relative shrink-0 text-[#1f2123] text-[16px] truncate w-full" title={adminName}>
              {adminName}
            </p>
            <p className="font-work font-normal relative shrink-0 text-[#7d7f82] text-[13px] truncate w-full" title={adminEmail}>
              {adminEmail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
