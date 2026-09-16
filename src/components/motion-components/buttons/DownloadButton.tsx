"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function DownloadButton() {
  return (
    <motion.button
      type="button"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className="group relative bg-[#F5F9FF] hover:bg-[#EAF2FF] transition-colors rounded-[10px] w-[127px] h-[43px] flex items-center justify-center gap-2 cursor-pointer select-none border border-[#EAF2FF] shadow-xs"
    >
      <span className="font-work font-medium text-[16px] text-black leading-[1.2]">
        Download
      </span>

      <motion.div
        variants={{
          hover: { y: 2 },
        }}
        transition={{ duration: 0.2 }}
        className="relative size-[18px] shrink-0"
      >
        <Image
          src="/icons/download.svg"
          alt="Download"
          width={18}
          height={18}
          className="size-full object-contain"
        />
      </motion.div>
    </motion.button>
  );
}
