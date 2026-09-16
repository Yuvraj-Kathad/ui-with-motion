"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function AcceptButton() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      className="bg-[#F6CC44] hover:bg-[#F5C730] transition-colors rounded-[32px] px-[24px] py-[12px] flex items-center justify-center font-work font-medium text-[16px] text-[#1F2123] leading-[1.2] shadow-sm select-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6CC44]"
    >
      Accept
    </motion.button>
  );
}
