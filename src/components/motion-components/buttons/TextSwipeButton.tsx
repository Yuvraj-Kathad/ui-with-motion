"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function TextSwipeButton() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      className="relative w-[89px] h-[19px] overflow-hidden outline-none cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1F2123] bg-transparent border-none p-0 block"
    >
      {/* Default Text (Swipes up and out) */}
      <motion.span
        initial={false}
        animate={{ top: isHovered ? "-21px" : "0px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[10px] font-work font-medium text-[16px] text-[#1F2123] leading-[1.2] whitespace-nowrap"
      >
        continue
      </motion.span>

      {/* Hidden Text (Swipes up into view) */}
      <motion.span
        initial={false}
        animate={{ top: isHovered ? "0px" : "25.5px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[10px] font-work font-medium text-[16px] text-[#1F2123] leading-[1.2] whitespace-nowrap"
      >
        continue
      </motion.span>
    </motion.button>
  );
}

