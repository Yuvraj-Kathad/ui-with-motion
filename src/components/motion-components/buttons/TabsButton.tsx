"use client";

import React, { useState } from "react";

export function TabsButton() {
  const [activeTab, setActiveTab] = useState<"Home" | "Services">("Home");

  return (
    <div className="flex flex-col gap-2 items-center justify-center select-none">
      <button
        type="button"
        onClick={() => setActiveTab("Home")}
        className={`relative px-[20px] py-[8px] font-work font-medium text-[16px] leading-[1.2] rounded-[16px] transition-colors cursor-pointer ${
          activeTab === "Home"
            ? "text-black bg-[#F7F9FB] shadow-xs"
            : "text-[#7D7F82] hover:text-black"
        }`}
      >
        Home
      </button>

      <button
        type="button"
        onClick={() => setActiveTab("Services")}
        className={`relative px-[20px] py-[8px] font-work font-medium text-[16px] leading-[1.2] rounded-[16px] transition-colors cursor-pointer ${
          activeTab === "Services"
            ? "text-black bg-[#F7F9FB] shadow-xs"
            : "text-[#7D7F82] hover:text-black"
        }`}
      >
        Services
      </button>
    </div>
  );
}
