"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function BookmarkButton() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const showActive = isActive || isHovered;

  return (
    <motion.button
      type="button"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsActive(!isActive)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
      className="relative p-[1.5px] rounded-[32px] overflow-hidden outline-none cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5694f3]"
    >
      {/* Hidden Gradient Layer that acts as the border on hover */}
      <motion.div
        initial={false}
        animate={{ opacity: showActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top right, #3b82f6, #fbbf24, #d946ef)"
        }}
      />

      {/* Inner Button Content */}
      <div className="relative flex items-center gap-[8px] px-[24px] py-[12px] bg-[#f5f9ff] rounded-[31px]">
        {/* Bookmark Icons Wrapper */}
        <div className="relative w-[24px] h-[24px] flex items-center justify-center">
          {/* Outline Icon (Default) */}
          <motion.svg
            initial={false}
            animate={{ opacity: showActive ? 0 : 1, scale: showActive ? 0.8 : 1 }}
            transition={{ duration: 0.2 }}
            className="absolute m-auto inset-0"
            width="16"
            height="21"
            viewBox="0 0 15.5001 20.1516"
            fill="none"
          >
            <path d="M0.750033 7.75003C0.750033 5.88875 0.750033 4.95811 0.994751 4.20495C1.48934 2.68276 2.68276 1.48934 4.20495 0.994751C4.95811 0.750033 5.88875 0.750033 7.75003 0.750033C9.61131 0.750033 10.542 0.750033 11.2951 0.994751C12.8173 1.48934 14.0107 2.68276 14.5053 4.20495C14.75 4.95811 14.75 5.88875 14.75 7.75003V15.1374C14.75 17.0545 14.75 18.0131 14.4081 18.52C13.9903 19.1393 13.2623 19.4742 12.5202 19.3883C11.9127 19.3181 11.1849 18.6942 9.72934 17.4466C9.08861 16.8974 8.76825 16.6228 8.41635 16.4984C7.9852 16.3461 7.51487 16.3461 7.08372 16.4984C6.73182 16.6228 6.41146 16.8974 5.77073 17.4466C4.31513 18.6942 3.58734 19.3181 2.9799 19.3883C2.23782 19.4742 1.50974 19.1393 1.09199 18.52C0.750033 18.0131 0.750033 17.0545 0.750033 15.1374V7.75003Z" stroke="#2D264B" strokeWidth="1.5"/>
          </motion.svg>

          {/* Solid Icon (Hover) */}
          <motion.svg
            initial={false}
            animate={{ opacity: showActive ? 1 : 0, scale: showActive ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute m-auto inset-0"
            width="15"
            height="20"
            viewBox="0 0 15 19.6516"
            fill="none"
          >
            <path d="M0.500011 7.50001C0.500011 5.63873 0.500011 4.70809 0.744729 3.95493C1.23932 2.43274 2.43274 1.23932 3.95493 0.744729C4.70809 0.500011 5.63873 0.500011 7.50001 0.500011C9.36129 0.500011 10.2919 0.500011 11.0451 0.744729C12.5673 1.23932 13.7607 2.43274 14.2553 3.95493C14.5 4.70809 14.5 5.63873 14.5 7.50001V14.8874C14.5 16.8045 14.5 17.7631 14.1581 18.27C13.7403 18.8893 13.0122 19.2242 12.2701 19.1383C11.6627 19.068 10.9349 18.4442 9.47932 17.1966C8.83859 16.6474 8.51822 16.3728 8.16632 16.2484C7.73518 16.0961 7.26485 16.0961 6.8337 16.2484C6.4818 16.3728 6.16143 16.6474 5.5207 17.1966C4.06511 18.4442 3.33732 19.068 2.72988 19.1383C1.98779 19.2242 1.25972 18.8893 0.841967 18.27C0.500011 17.7631 0.500011 16.8045 0.500011 14.8874V7.50001Z" fill="#1F2123" stroke="#1F2123"/>
          </motion.svg>
        </div>

        <span className="font-work font-medium text-[#1F2123] text-[16px] leading-[1.2] whitespace-nowrap">
          Bookmark
        </span>
      </div>
    </motion.button>
  );
}







