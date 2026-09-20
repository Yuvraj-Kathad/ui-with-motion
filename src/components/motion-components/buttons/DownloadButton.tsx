"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ButtonState = "default" | "downloading" | "processing" | "success";

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
      d="M4.96784 18.6884L4.85051 19.4292H4.85051L4.96784 18.6884ZM0.811567 14.5322L1.55233 14.4148V14.4148L0.811567 14.5322ZM18.6885 14.5322L19.4292 14.6495V14.6495L18.6885 14.5322ZM14.5322 18.6884L14.6495 19.4292H14.6495L14.5322 18.6884ZM18.35 8.29957C18.1013 7.96837 17.6311 7.90156 17.2999 8.15032C16.9688 8.39909 16.9019 8.86924 17.1507 9.20043L17.7504 8.75L18.35 8.29957ZM2.34932 9.20043C2.59808 8.86924 2.53127 8.39909 2.20008 8.15032C1.86888 7.90156 1.39874 7.96838 1.14997 8.29957L1.74964 8.75L2.34932 9.20043ZM10.5 0.75C10.5 0.335786 10.1642 0 9.75001 0C9.3358 0 9.00001 0.335786 9.00001 0.75H9.75001H10.5ZM6.33769 10.284C6.08034 9.95946 5.60861 9.90497 5.28404 10.1623C4.95947 10.4197 4.90498 10.8914 5.16232 11.216L5.75001 10.75L6.33769 10.284ZM7.14785 12.513L6.56017 12.9789V12.9789L7.14785 12.513ZM12.3522 12.513L11.7645 12.047V12.047L12.3522 12.513ZM14.3377 11.216C14.595 10.8914 14.5405 10.4197 14.216 10.1623C13.8914 9.90497 13.4197 9.95946 13.1623 10.284L13.75 10.75L14.3377 11.216ZM9.49934 14.7301L9.38134 15.4708L9.38134 15.4708L9.49934 14.7301ZM10.0007 14.7301L10.1187 15.4708L10.1187 15.4708L10.0007 14.7301ZM18.75 11.75H18V12.75H18.75H19.5V11.75H18.75ZM12.75 18.75V18H6.75001V18.75V19.5H12.75V18.75ZM0.750008 12.75H1.50001V11.75H0.750008H8.34465e-06V12.75H0.750008ZM6.75001 18.75V18C5.79234 18 5.40083 17.9977 5.08516 17.9477L4.96784 18.6884L4.85051 19.4292C5.31217 19.5023 5.84966 19.5 6.75001 19.5V18.75ZM0.750008 12.75H8.34465e-06C8.34465e-06 13.6503 -0.00231928 14.1878 0.0708004 14.6495L0.811567 14.5322L1.55233 14.4148C1.50234 14.0992 1.50001 13.7077 1.50001 12.75H0.750008ZM4.96784 18.6884L5.08516 17.9477C3.26662 17.6596 1.84036 16.2334 1.55233 14.4148L0.811567 14.5322L0.0708004 14.6495C0.460487 17.1099 2.39013 19.0395 4.85051 19.4292L4.96784 18.6884ZM18.75 12.75H18C18 13.7077 17.9977 14.0992 17.9477 14.4148L18.6885 14.5322L19.4292 14.6495C19.5023 14.1878 19.5 13.6503 19.5 12.75H18.75ZM12.75 18.75V19.5C13.6504 19.5 14.1878 19.5023 14.6495 19.4292L14.5322 18.6884L14.4149 17.9477C14.0992 17.9977 13.7077 18 12.75 18V18.75ZM18.6885 14.5322L17.9477 14.4148C17.6597 16.2334 16.2334 17.6596 14.4149 17.9477L14.5322 18.6884L14.6495 19.4292C17.1099 19.0395 19.0395 17.1099 19.4292 14.6495L18.6885 14.5322ZM18.75 11.75H19.5C19.5 10.4564 19.0719 9.26065 18.35 8.29957L17.7504 8.75L17.1507 9.20043C17.6842 9.91067 18 10.7924 18 11.75H18.75ZM0.750008 11.75H1.50001C1.50001 10.7924 1.81583 9.91067 2.34932 9.20043L1.74964 8.75L1.14997 8.29957C0.428072 9.26065 8.34465e-06 10.4564 8.34465e-06 11.75H0.750008ZM9.75001 0.75H9.00001V13.75H9.75001H10.5V0.75H9.75001ZM5.75001 10.75L5.16232 11.216L6.56017 12.9789L7.14785 12.513L7.73554 12.047L6.33769 10.284L5.75001 10.75ZM12.3522 12.513L12.9398 12.9789L14.3377 11.216L13.75 10.75L13.1623 10.284L11.7645 12.047L12.3522 12.513ZM7.14785 12.513L6.56017 12.9789C7.10617 13.6676 7.55475 14.2352 7.95552 14.6375C8.35963 15.0432 8.80817 15.3794 9.38134 15.4708L9.49934 14.7301L9.61735 13.9895C9.51117 13.9725 9.34133 13.9032 9.01823 13.5789C8.69178 13.2512 8.3043 12.7643 7.73554 12.047L7.14785 12.513ZM12.3522 12.513L11.7645 12.047C11.1957 12.7643 10.8082 13.2512 10.4818 13.5789C10.1587 13.9032 9.98885 13.9725 9.88267 13.9895L10.0007 14.7301L10.1187 15.4708C10.6919 15.3794 11.1404 15.0432 11.5445 14.6375C11.9453 14.2352 12.3939 13.6675 12.9398 12.9789L12.3522 12.513ZM9.49934 14.7301L9.38134 15.4708C9.50345 15.4902 9.62662 15.5 9.75001 15.5V14.75V14C9.70595 14 9.66169 13.9965 9.61735 13.9895L9.49934 14.7301ZM9.75001 14.75V15.5C9.87339 15.5 9.99657 15.4902 10.1187 15.4708L10.0007 14.7301L9.88267 13.9895C9.83833 13.9965 9.79406 14 9.75001 14V14.75ZM9.75001 13.75H9.00001V14.75H9.75001H10.5V13.75H9.75001Z" 
      fill="currentColor" 
    />
  </svg>
);

const TickIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
      d="M16.75 0.750019L11.3593 7.21883C9.22321 9.78219 8.15514 11.0639 6.75002 11.0639C5.34489 11.0639 4.27683 9.78219 2.14069 7.21883L0.750019 5.55002" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
    />
  </svg>
);

export function DownloadButton() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [buttonState, setButtonState] = useState<ButtonState>("default");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (buttonState === "downloading") {
      timeout = setTimeout(() => setButtonState("processing"), 2000);
    } else if (buttonState === "processing") {
      timeout = setTimeout(() => setButtonState("success"), 1500);
    } else if (buttonState === "success") {
      timeout = setTimeout(() => setButtonState("default"), 2500);
    }
    return () => clearTimeout(timeout);
  }, [buttonState]);

  const handleClick = () => {
    if (buttonState === "default") {
      setButtonState("downloading");
    }
  };

  const isActive = buttonState !== "default" || isHovered;

  return (
    <motion.button
      type="button"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      whileTap={shouldReduceMotion || buttonState !== "default" ? {} : { scale: 0.96 }}
      className="relative block w-[127px] h-[43px] rounded-[10px] cursor-pointer select-none overflow-hidden bg-[#F5F9FF]"
    >
      {/* "Download" Text */}
      <motion.span
        initial={false}
        animate={shouldReduceMotion ? {} : { y: isActive ? 40 : 0 }}
        transition={{ type: "tween", ease: "backInOut", duration: 0.4 }}
        className="absolute top-[12px] left-[24px] font-work font-medium text-[16px] leading-[1.2] whitespace-nowrap text-black"
      >
        Download
      </motion.span>

      {/* Download Icon */}
      <motion.div
        initial={false}
        animate={
          shouldReduceMotion 
            ? { opacity: isActive ? 1 : 0 }
            : { 
                y: isActive ? 0 : -70,
                opacity: (buttonState === "default" || buttonState === "downloading") ? 1 : 0
              }
        }
        transition={{ type: "tween", ease: "backInOut", duration: 0.4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black size-[24px] flex items-center justify-center"
      >
        <DownloadIcon className="w-[19.5px] h-[19.5px]" />
      </motion.div>

      {/* Tick Icon */}
      <motion.div
        initial={false}
        animate={{
          left: buttonState === "success" ? "calc(50% - 33.5px)" : "50%",
          opacity: (buttonState === "processing" || buttonState === "success") ? 1 : 0,
          color: buttonState === "success" ? "#008232" : "#2D264B",
          scale: (buttonState === "processing" || buttonState === "success") ? 1 : 0.5
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 size-[24px] flex items-center justify-center"
      >
        <TickIcon className="w-[17.5px] h-[11.8px]" />
      </motion.div>

      {/* "Success" Text */}
      <motion.span
        initial={false}
        animate={{
          opacity: buttonState === "success" ? 1 : 0,
          x: buttonState === "success" ? 0 : 10
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute top-1/2 -translate-y-1/2 left-[49px] font-work font-medium text-[16px] leading-[1.2] whitespace-nowrap text-[#008232]"
      >
        Success
      </motion.span>

      {/* Orange Progress Bar */}
      <motion.div
        initial={false}
        animate={{
          width: (buttonState === "downloading" || buttonState === "processing") ? 126 : 0,
          opacity: buttonState === "processing" ? 0 : 1
        }}
        transition={{
          width: { type: "tween", ease: "easeInOut", duration: buttonState === "downloading" ? 2 : 0.3 },
          opacity: { duration: 0.3 }
        }}
        className="absolute top-[39px] left-[1px] h-[4px] bg-[#DB7100]"
      />

      {/* Rainbow Progress Bar */}
      <motion.div
        initial={false}
        animate={{
          width: (buttonState === "downloading" || buttonState === "processing") ? 126 : 0,
          opacity: buttonState === "processing" ? 1 : 0
        }}
        transition={{
          width: { type: "tween", ease: "easeInOut", duration: buttonState === "downloading" ? 2 : 0.3 },
          opacity: { duration: 0.3 }
        }}
        className="absolute top-[39px] left-[1px] h-[4px]"
        style={{
          backgroundImage: "linear-gradient(90deg, rgb(219, 113, 0) 0%, rgb(227, 79, 79) 16.346%, rgb(234, 214, 145) 38.462%, rgb(158, 230, 127) 67.788%, rgb(132, 198, 234) 81.25%, rgb(0, 150, 61) 100%)"
        }}
      />
    </motion.button>
  );
}
