"use client";

import React from "react";
import { motion } from "framer-motion";

export function ServicesIndicatorButton() {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      className="inline-flex items-center gap-3 cursor-pointer select-none py-1"
    >
      {/* Purple Vertical Indicator */}
      <div className="w-[3px] h-[24px] bg-[#6911EE] rounded-full shrink-0 shadow-[0_0_8px_rgba(105,17,238,0.4)]" />

      <span className="font-work font-medium text-[16px] text-black leading-[1.2] whitespace-nowrap">
        Services
      </span>
    </motion.div>
  );
}
