"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function MailButton() {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="bg-[#F7F9FB] hover:bg-[#EEF1F4] border border-[#DEE1E4]/60 rounded-[43px] size-[46px] flex items-center justify-center cursor-pointer select-none transition-colors shadow-xs"
      aria-label="Send message"
    >
      <div className="relative size-[24px]">
        <Image
          src="/icons/mail.svg"
          alt="Mail"
          width={24}
          height={24}
          className="size-full object-contain"
        />
      </div>
    </motion.button>
  );
}
