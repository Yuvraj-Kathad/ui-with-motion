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

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAdminEmail(user.email || "Admin User");
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
    <aside className="w-[280px] h-screen bg-white border-r border-[#E9EAEB] flex flex-col shrink-0">
      <div className="h-[96px] border-b border-[#E9EAEB] flex items-center px-8 shrink-0">
        <Link href="/admin">
          <div className="relative w-[100px] h-[40px]">
            <Image
              src="/icons/logo.svg"
              alt="UX With Motion"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#FFDBB9] text-[#111111]"
                  : "text-[#888888] hover:bg-[#F6F7F8] hover:text-[#111111]"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-[#E9EAEB]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F6F7F8] border border-[#E9EAEB] flex items-center justify-center overflow-hidden shrink-0">
              <Image 
                src="/images/branding-logo.png" 
                alt="Avatar" 
                width={24} 
                height={24} 
                className="opacity-50"
              />
            </div>
            <div className="flex flex-col max-w-[140px]">
              <span className="text-sm font-semibold text-[#111111] truncate">
                {adminEmail}
              </span>
              <span className="text-xs text-[#888888]">Admin</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="text-[#888888] hover:text-red-500 transition-colors shrink-0"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
