"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function AcceptButton() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      className="relative bg-[#F6CC44] rounded-[32px] px-[24px] py-[12px] flex items-center justify-center font-work font-medium text-[16px] text-[#1F2123] leading-[1.2] shadow-sm select-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6CC44] overflow-hidden"
    >
      {/* Shine Effect Container */}
      <motion.div
        className="absolute left-0 top-0 blur-[0.8px] h-[100px] w-[100px] mix-blend-lighten pointer-events-none"
        initial={false}
        animate={{ 
          x: isHovered ? -38.5 : 67.5, 
          y: isHovered ? 0.5 : -52.5 
        }}
        transition={{ 
          duration: 0.45, 
          ease: "easeInOut"
        }}
      >
        <div className="absolute flex items-center justify-center left-[-8.5px] h-[109px] w-[109px] top-[-5px]">
          <div className="-rotate-45 flex-none">
            <div className="bg-[#fae48f] h-[136px] w-[18px]" />
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[-26px] h-[114px] w-[114px] top-[0.5px]">
          <div className="-rotate-45 flex-none">
            <div className="bg-[#fae48f] h-[154px] w-[6px]" />
          </div>
        </div>
      </motion.div>

      <span className="relative z-10">Accept</span>
    </motion.button>
  );
}
