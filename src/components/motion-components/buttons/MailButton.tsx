"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function MailButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.94 }}
      animate={{
        width: isHovered ? 262 : 46,
        paddingLeft: isHovered ? 16 : 11,
        paddingRight: isHovered ? 16 : 11,
      }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
      }}
      className={`bg-[#F7F9FB] rounded-[43px] h-[46px] flex items-center cursor-pointer select-none transition-all shadow-xs overflow-hidden border ${
        isHovered
          ? 'border-transparent [background:linear-gradient(#F7F9FB,#F7F9FB)_padding-box,linear-gradient(to_right,#A9C9FF,#A57FF0)_border-box]'
          : 'border-transparent'
      }`}
      aria-label="Send message"
    >
      <div className="relative size-[24px] shrink-0">
        <Image
          src="/icons/mail.svg"
          alt="Mail"
          width={24}
          height={24}
          className="size-full object-contain"
        />
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, delay: isHovered ? 0.05 : 0 }}
            className="ml-[14px] whitespace-nowrap shrink-0"
          >
            <span className="font-work font-medium text-[16px] text-black">
              gfxwithsahil@gmail.com
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
