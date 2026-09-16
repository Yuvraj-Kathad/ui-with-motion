"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function GenerateButton() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative cursor-pointer select-none">
      {/* 3D Base Shadow in Deep Blue — always static */}
      <div className="absolute inset-0 bg-[#0E3067] rounded-[79px] translate-y-[3px] w-[120px] h-[43px]" />

      {/* Top Pill Surface — moves down on press */}
      <motion.div
        whileTap={shouldReduceMotion ? {} : { y: 3 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className="relative bg-white border border-[#E7E7E7] rounded-[79px] w-[120px] h-[43px] flex items-center justify-center font-work font-medium text-[16px] text-[#1F2123] leading-[1.2] shadow-xs"
      >
        Generate
      </motion.div>
    </div>
  );
}
