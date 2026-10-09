"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function RunButton() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      className="relative w-[383px] h-[500px] bg-[#fbfcfd] border border-[#dee1e4] border-solid rounded-[48px] overflow-hidden outline-none cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
    >
      {/* Top Left Title */}
      <span
        className="absolute left-[35px] top-[34px] font-medium text-[28.6px] leading-normal text-[#050505]"
        style={{ fontFamily: "'GC Methane Demo', sans-serif" }}
      >
        Run
      </span>

      {/* Centered Text Swipe Mask */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[19.2px] overflow-hidden">
        <motion.div
          animate={{ y: isHovered ? "-50%" : "0%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          {/* Default Text */}
          <span className="font-work font-medium text-[16px] text-black leading-[1.2] h-[19.2px] flex items-center justify-center">
            continue
          </span>
          {/* Hidden Text (Swipes up into view) */}
          <span className="font-work font-medium text-[16px] text-black leading-[1.2] h-[19.2px] flex items-center justify-center">
            continue
          </span>
        </motion.div>
      </div>
    </motion.button>
  );
}

