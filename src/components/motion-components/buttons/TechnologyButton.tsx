"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function TechnologyButton() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
      className="relative block w-[92px] h-[33px] cursor-pointer select-none overflow-hidden"
    >
      {/* Background Text */}
      <motion.span
        initial={false}
        animate={{
          color: isHovered ? "#DEE1E4" : "#000000",
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-[2px] top-[7px] font-work font-medium text-[16px] leading-[1.2] whitespace-nowrap z-0"
      >
        Technology
      </motion.span>

      {/* Sweeping Banner */}
      <motion.div
        initial={false}
        animate={shouldReduceMotion ? {} : { top: isHovered ? 5 : 55 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        className="absolute left-0 w-[92px] h-[24px] bg-[#0E62E0] flex items-center justify-center z-10"
      >
        <motion.span 
          initial={false}
          animate={{ scale: isHovered ? 1 : 0.8 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
          className="font-work font-normal uppercase text-white whitespace-nowrap text-[10px] leading-[1.2]"
        >
          Coming soon
        </motion.span>
      </motion.div>
    </motion.button>
  );
}

