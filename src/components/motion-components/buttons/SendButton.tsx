"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function SendButton() {
  const shouldReduceMotion = useReducedMotion();
  const [state, setState] = useState<"idle" | "ready" | "sending">("idle");

  const handleHoverStart = () => {
    if (state === "idle") setState("ready");
  };

  const handleHoverEnd = () => {
    if (state === "ready") setState("idle");
  };

  const handleClick = () => {
    if (state === "ready" || state === "idle") {
      setState("sending");
      setTimeout(() => {
        setState("idle");
      }, 1200);
    }
  };

  return (
    <motion.button
      type="button"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
      onClick={handleClick}
      initial="idle"
      animate={state}
      whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
      className="relative w-[128px] h-[48px] bg-[#f5f9ff] rounded-[55px] overflow-hidden outline-none cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#a57ff0]"
    >
      {/* Gradient Border Overlay */}
      <motion.div
        variants={{
          idle: { opacity: 0 },
          ready: { opacity: 1 },
          sending: { opacity: 1 }
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 p-[1px] rounded-[55px] pointer-events-none"
        style={{
          background: "linear-gradient(to right, #6ea5ff, #bd8eff)"
        }}
      >
        <div className="w-full h-full bg-[#f5f9ff] rounded-[53px]" />
      </motion.div>

      {/* Paper Plane Icon */}
      <motion.div
        variants={{
          idle: { left: "24px", top: "12px", x: "0%", y: "0%", rotate: 0 },
          ready: { left: "50%", top: "50%", x: "-50%", y: "-50%", rotate: 45 },
          sending: { left: "calc(50% + 80px)", top: "50%", x: "-50%", y: "-50%", rotate: 45 }
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute flex items-center justify-center text-[#1F2123] w-[24px] h-[24px]"
      >
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          overflow="visible"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.3078 13.6923L15.1539 8.84619M20.1113 5.88867L16.0207 19.1833C15.6541 20.3747 15.4706 20.9707 15.1544 21.1683C14.8802 21.3396 14.5406 21.3683 14.2419 21.2443C13.8975 21.1014 13.618 20.5433 13.0603 19.428L10.4694 14.2461C10.3809 14.0691 10.3366 13.981 10.2775 13.9043C10.225 13.8363 10.1645 13.7749 10.0965 13.7225C10.0215 13.6647 9.93486 13.6214 9.76577 13.5369L4.57192 10.9399C3.45662 10.3823 2.89892 10.1032 2.75601 9.75879C2.63207 9.4601 2.66033 9.12023 2.83169 8.84597C3.02928 8.52974 3.62523 8.34603 4.81704 7.97932L18.1116 3.88867C19.0486 3.60038 19.5173 3.45635 19.8337 3.57253C20.1094 3.67373 20.3267 3.89084 20.4279 4.16651C20.544 4.48283 20.3999 4.95126 20.1119 5.88729L20.1113 5.88867Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Button Text */}
      <motion.span
        variants={{
          idle: { left: "64px" },
          ready: { left: "143px" },
          sending: { left: "143px" }
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute font-work font-medium text-[16px] text-black leading-[1.2] whitespace-nowrap top-[13.5px]"
      >
        Send
      </motion.span>
    </motion.button>
  );
}



