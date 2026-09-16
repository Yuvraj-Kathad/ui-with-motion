"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function GetAccessButton() {
  return (
    <motion.button
      type="button"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className="group relative border border-[#E87D02] border-dashed rounded-[79px] pl-[8px] pr-[24px] py-[8px] flex items-center gap-[12px] bg-transparent hover:bg-[#FFF8F0] transition-colors cursor-pointer select-none"
    >
      <div className="bg-[#DB7100] rounded-full size-[40px] flex items-center justify-center shrink-0 shadow-xs">
        <motion.div
          variants={{
            hover: { x: 2 },
          }}
          transition={{ duration: 0.2 }}
          className="relative size-[20px]"
        >
          <Image
            src="/icons/arrow-right.svg"
            alt=""
            width={20}
            height={20}
            className="size-full object-contain"
          />
        </motion.div>
      </div>

      <span className="font-work font-medium text-[16px] text-black leading-[1.2] whitespace-nowrap">
        Get Access
      </span>
    </motion.button>
  );
}
