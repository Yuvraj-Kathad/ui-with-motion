"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} preserveAspectRatio="none" overflow="visible" style={{ display: "block" }} width="18" height="2" viewBox="0 0 17.5 1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.75 0.75H16.75" stroke="#2D264B" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function AddIcon({ className }: { className?: string }) {
  return (
    <svg className={className} preserveAspectRatio="none" overflow="visible" style={{ display: "block" }} width="18" height="18" viewBox="0 0 17.5 17.5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.75 8.75H16.75M8.75 16.75V8.75L8.75 0.75" stroke="#2D264B" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function StepperButton() {
  const [count, setCount] = useState(0);
  const [direction, setDirection] = useState(1);

  const increment = () => {
    setDirection(1);
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setDirection(-1);
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="bg-white border border-[#d8dee9] border-solid flex items-center justify-between overflow-hidden relative rounded-[12px] h-[52px] min-w-[203px]">
      
      {/* Minus Button */}
      <motion.button
        type="button"
        onClick={decrement}
        whileHover={{ backgroundColor: "#d1d6dc" }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#e6e9ec] flex h-full items-center justify-center overflow-hidden px-[16px] py-[14px] relative shrink-0 outline-none cursor-pointer border-none"
      >
        <div className="flex items-center justify-center w-[24px] h-[24px]">
          <MinusIcon />
        </div>
      </motion.button>
      
      {/* Center Number with Swiping Animation */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden h-full bg-white min-w-[40px]">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.p
            key={count}
            custom={direction}
            initial={{ y: direction > 0 ? "100%" : "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: direction > 0 ? "-100%" : "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-normal leading-[normal] text-[#1f2123] text-[14px] whitespace-nowrap m-0 select-none"
          >
            {count}
          </motion.p>
        </AnimatePresence>
      </div>
      
      {/* Plus Button */}
      <motion.button
        type="button"
        onClick={increment}
        whileHover={{ backgroundColor: "#d1d6dc" }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#e6e9ec] flex h-full items-center justify-center overflow-hidden px-[16px] py-[14px] relative shrink-0 outline-none cursor-pointer border-none"
      >
        <div className="flex items-center justify-center w-[24px] h-[24px]">
          <AddIcon />
        </div>
      </motion.button>
      
    </div>
  );
}
