"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const TABS = [
  { id: "Overview", label: "Overview" },
  { id: "Activity", label: "Activity" },
  { id: "Messages", label: "Messages" },
  { id: "Profile", label: "Profile" },
];

export function FourItemTabs() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="bg-white border border-[#e4e9f0] flex h-[72px] items-center overflow-hidden p-[8px] relative rounded-[12px] shadow-[0_2px_8px_rgba(23,32,51,0.04)] w-full max-w-[560px]">
      {/* Background Divider Line */}
      <div className="absolute bg-[#e4e9f0] bottom-[7px] h-px left-[7px] right-[7px]" />

      <div className="flex items-center w-full h-full relative z-10">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col flex-1 h-full items-center justify-center cursor-pointer select-none"
            >
              <div className="flex h-[38px] items-center justify-center px-[16px] py-[8px] rounded-[68px]">
                <span
                  className={`font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[16px] whitespace-nowrap transition-colors duration-300 ${
                    isActive ? "text-[#2f6fed]" : "text-[#697386]"
                  }`}
                >
                  {tab.label}
                </span>
              </div>

              {/* Active Indicator Line */}
              {isActive && (
                <motion.div
                  layoutId="four-item-active-indicator"
                  className="absolute bottom-[-1px] w-[28px] h-[2px] bg-[#2f6fed] rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

