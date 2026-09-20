"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function ServicesIndicatorButton() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
      className="relative block w-[91px] h-[24px] cursor-pointer select-none"
    >
      {/* Moving Purple Line */}
      <motion.div
        initial={false}
        animate={shouldReduceMotion ? {} : { left: isHovered ? 86 : 0 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        className="absolute top-0 w-[5px] h-[24px] bg-[#6911EE] z-0"
      />

      {/* Text */}
      <motion.span
        initial={false}
        animate={{ color: isHovered ? "#6911EE" : "#000000" }}
        transition={{ duration: 0.2 }}
        className={`absolute top-1/2 -translate-y-1/2 left-[15px] font-work leading-[1.2] whitespace-nowrap z-10 transition-all duration-200 ${
          isHovered ? "font-semibold" : "font-medium"
        }`}
      >
        Services
      </motion.span>
    </motion.button>
  );
}
