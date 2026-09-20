"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const SquiggleFilter = () => (
  <svg style={{ position: "absolute", width: 0, height: 0 }}>
    <filter id="ink-bleed">
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
);

export function TabsButton() {
  const [hoveredTab, setHoveredTab] = useState<"Home" | "Services" | null>(null);

  return (
    <div className="flex flex-col gap-4 items-center justify-center select-none">
      <SquiggleFilter />

      {/* Home Tab */}
      <motion.button
        type="button"
        onHoverStart={() => setHoveredTab("Home")}
        onHoverEnd={() => setHoveredTab(null)}
        className="content-stretch flex items-center justify-center px-[20px] py-[8px] relative rounded-[20px] cursor-pointer"
      >
        <motion.p
          animate={{
            filter: hoveredTab === "Home" ? "url(#ink-bleed)" : "none",
          }}
          transition={{ duration: 0.3 }}
          className="font-work font-medium leading-[1.2] shrink-0 text-[16px] text-black whitespace-nowrap"
        >
          Home
        </motion.p>
      </motion.button>

      {/* Services Tab */}
      <motion.button
        type="button"
        onHoverStart={() => setHoveredTab("Services")}
        onHoverEnd={() => setHoveredTab(null)}
        className="content-stretch flex items-center justify-center px-[20px] py-[8px] relative rounded-[20px] cursor-pointer"
      >
        <motion.p
          animate={{
            filter: hoveredTab === "Services" ? "blur(1.45px)" : "blur(0px)",
          }}
          transition={{ duration: 0.3 }}
          className="font-work font-medium leading-[1.2] shrink-0 text-[16px] text-black whitespace-nowrap"
        >
          Services
        </motion.p>
      </motion.button>
    </div>
  );
}
