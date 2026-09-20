"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const Sparkle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 7.90355 7.65093" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2.65773 0.940258C3.06507 -0.313419 4.83869 -0.313419 5.24604 0.940258C5.42821 1.50092 5.95068 1.88052 6.54019 1.88052C7.85839 1.88052 8.40647 3.56733 7.34002 4.34214C6.8631 4.68865 6.66353 5.30285 6.8457 5.86351C7.25304 7.11719 5.81816 8.1597 4.75172 7.38488C4.27479 7.03837 3.62898 7.03837 3.15205 7.38488C2.08561 8.1597 0.650723 7.11719 1.05807 5.86351C1.24024 5.30285 1.04067 4.68865 0.563745 4.34214C-0.502697 3.56733 0.0453818 1.88052 1.36358 1.88052C1.95309 1.88052 2.47556 1.50092 2.65773 0.940258Z" fill="currentColor"/>
  </svg>
);

const stars = [
  { initial: { left: 38, top: 16, width: 9, height: 9, opacity: 0 }, hover: { left: 23, top: 2, width: 11, height: 11, opacity: 1 } },
  { initial: { left: 34, top: 31, width: 2, height: 2, opacity: 0 }, hover: { left: 20, top: 29, width: 2, height: 2, opacity: 1 } },
  { initial: { left: 64, top: 29, width: 4, height: 4, opacity: 0 }, hover: { left: 54, top: 30, width: 5, height: 5, opacity: 1 } },
  { initial: { left: 90, top: 13, width: 2, height: 2, opacity: 0 }, hover: { left: 88, top: 7, width: 3, height: 3, opacity: 1 } },
  { initial: { left: 69, top: 15, width: 5, height: 5, opacity: 0 }, hover: { left: 64, top: 8, width: 6, height: 6, opacity: 1 } },
  { initial: { left: 96, top: 26, width: 15, height: 15, opacity: 0 }, hover: { left: 114, top: 29, width: 18, height: 18, opacity: 1 } },
  { initial: { left: 107, top: 9, width: 7, height: 7, opacity: 0 }, hover: { left: 105, top: 8, width: 9, height: 9, opacity: 1 } },
  { initial: { left: 14, top: 9, width: 17, height: 17, opacity: 0, rotate: -21 }, hover: { left: -15, top: -6, width: 21, height: 21, opacity: 1, rotate: -21 } }
];

export function ContinueButton() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
      className={`relative flex items-center justify-center rounded-[52px] h-[43px] w-[119px] transition-colors duration-300 font-work font-medium text-[16px] leading-[1.2] shadow-sm cursor-pointer select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A] ${
        isHovered 
          ? "border border-[#00963d] bg-transparent text-[#00963d]" 
          : "bg-[#16A34A] border border-transparent text-white overflow-hidden"
      }`}
    >
      <span className="relative z-10">Continue</span>

      {stars.map((star, idx) => (
        <motion.div
          key={idx}
          className="absolute text-[#FFD700] pointer-events-none"
          initial={false}
          animate={{
            left: isHovered ? star.hover.left : star.initial.left,
            top: isHovered ? star.hover.top : star.initial.top,
            width: isHovered ? star.hover.width : star.initial.width,
            height: isHovered ? star.hover.height : star.initial.height,
            opacity: isHovered ? star.hover.opacity : star.initial.opacity,
            rotate: star.hover.rotate ? star.hover.rotate : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            delay: isHovered ? idx * 0.015 : 0, // tiny stagger effect outward
          }}
        >
          <Sparkle className="w-full h-full" />
        </motion.div>
      ))}
    </motion.button>
  );
}
