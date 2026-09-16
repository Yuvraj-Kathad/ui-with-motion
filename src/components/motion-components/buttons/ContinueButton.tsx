"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function ContinueButton() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -2,
              boxShadow: "0 6px 16px rgba(22, 163, 74, 0.30)",
            }
      }
      whileTap={
        shouldReduceMotion
          ? {}
          : {
              y: 0,
              boxShadow: "0 1px 4px rgba(22, 163, 74, 0.15)",
            }
      }
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="bg-[#16A34A] hover:bg-[#15803D] transition-colors h-[43px] w-[119px] rounded-[52px] flex items-center justify-center text-white font-work font-medium text-[16px] leading-[1.2] shadow-sm select-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A]"
    >
      Continue
    </motion.button>
  );
}
