"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function BubbleArrowButton() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
      className="relative flex items-center h-[43px] w-[119px] overflow-hidden rounded-[55px] bg-[#fcfcfc] border-none outline-none cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1566E5]"
    >
      {/* The Blue Bubble that rises from the bottom */}
      <motion.div
        initial={false}
        animate={{
          y: isHovered ? "-50%" : 0,
          top: isHovered ? "50%" : "43px",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute left-1/2 -translate-x-1/2 w-[146px] h-[146px] bg-[#1566E5] rounded-full pointer-events-none"
      />

      {/* Button Text */}
      <motion.span
        initial={false}
        animate={{
          x: isHovered ? 14 : 24,
          color: isHovered ? "#FFFFFF" : "#1F2123",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute font-work font-medium text-[16px] leading-[1.2] whitespace-nowrap z-10"
      >
        Continue
      </motion.span>

      {/* Right Arrow Icon */}
      <motion.div
        initial={false}
        animate={{
          x: isHovered ? 89 : 117,
          color: isHovered ? "#FFFFFF" : "#1F2123",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute z-10 top-1/2 -translate-y-1/2"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </motion.div>
    </motion.button>
  );
}

