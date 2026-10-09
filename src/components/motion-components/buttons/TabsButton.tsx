"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const TABS = [
  { 
    id: "Telegram", 
    label: "Telegram", 
    iconActive: "/images/tabs/imgComponent5.svg", 
    iconInactive: "/images/tabs/imgComponent6.svg" 
  },
  { 
    id: "Instagram", 
    label: "Instagram", 
    iconActive: "/images/tabs/imgComponent9.svg", 
    iconInactive: "/images/tabs/imgComponent7.svg" 
  },
  { 
    id: "Thread", 
    label: "Thread", 
    iconActive: "/images/tabs/imgComponent10.svg", 
    iconInactive: "/images/tabs/imgComponent8.svg" 
  },
];

export function TabsButton() {
  const [activeTab, setActiveTab] = useState("Telegram");

  return (
    <div className="bg-[#eef1f4] border border-[#e8e8e8] flex items-center p-[6px] rounded-[999px] h-[48px] overflow-hidden relative select-none">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <motion.button
            key={tab.id}
            layout
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center justify-center shrink-0 rounded-[999px] h-[36px] transition-all duration-300 ease-in-out cursor-pointer ${
              isActive ? "px-[14px]" : "w-[36px]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="tab-bubble"
                className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-[999px] border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,1)]"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            
            <div className="relative z-10 flex items-center justify-center gap-[6px]">
              <div className="w-[18px] h-[18px] shrink-0 flex items-center justify-center">
                <Image 
                  src={isActive ? tab.iconActive : tab.iconInactive}
                  alt={tab.label}
                  width={18}
                  height={18}
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>
              
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
                    exit={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                    transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                    className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] text-[#1f2123] whitespace-nowrap overflow-hidden"
                  >
                    {tab.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
