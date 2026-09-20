"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 25 25" width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
      d="M5.20833 12.5H19.7917M13.5417 18.75L19.7917 12.5L13.5417 6.25" 
      stroke="currentColor" 
      strokeWidth="1.875" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export function GetAccessButton() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
      className={`relative block w-[171px] h-[56px] rounded-[79px] cursor-pointer select-none transition-all duration-500 overflow-hidden border ${
        isHovered
          ? "bg-[#DB7100] border-[#DB7100] shadow-[inset_0px_0px_4.7px_1px_rgba(0,0,0,0.25)]"
          : "border-[#E87D02] border-dashed bg-transparent shadow-none"
      }`}
    >
      {/* Moving Circle */}
      <motion.div
        initial={false}
        animate={{
          left: isHovered ? 123 : 8,
          backgroundColor: isHovered ? "#FCFCFC" : "#DB7100",
          color: isHovered ? "#DB7100" : "#FFFFFF"
        }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
        className="absolute top-[7px] size-[40px] rounded-full flex items-center justify-center z-10"
      >
        <motion.div
          initial={false}
          animate={shouldReduceMotion ? {} : { rotate: isHovered ? 0 : 180 }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
          className="relative size-[25px]"
        >
          <ArrowIcon className="w-full h-full" />
        </motion.div>
      </motion.div>

      {/* Moving Text */}
      <motion.span
        initial={false}
        animate={{
          left: isHovered ? 24 : 60,
          color: isHovered ? "#FFFFFF" : "#000000"
        }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
        className="absolute top-1/2 -translate-y-1/2 font-work font-medium text-[16px] leading-[1.2] whitespace-nowrap z-10"
      >
        Get Access
      </motion.span>
    </motion.button>
  );
}
