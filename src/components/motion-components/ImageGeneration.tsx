"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ImageGeneration() {
  const [status, setStatus] = useState<"idle" | "generating" | "completed">("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === "generating") {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 6) + 2; 
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setTimeout(() => setStatus("completed"), 500); 
        }
        setProgress(currentProgress);
      }, 120); 
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleReset = () => {
    setStatus("idle");
    setProgress(0);
  };

  const renderDots = () => {
    const dots = [];
    for (let row = 0; row < 14; row++) {
      for (let col = 0; col < 14; col++) {
        // Missing dots logic for the center void
        if (row === 5 && col >= 5 && col <= 8) continue;
        if (row === 6 && col >= 4 && col <= 9) continue;
        if (row === 7 && col >= 4 && col <= 9) continue;
        if (row === 8 && col >= 5 && col <= 8) continue;

        dots.push(
          <div
            key={`${row}-${col}`}
            className="absolute bg-[#E6E9EC] rounded-full"
            style={{
              width: "8px",
              height: "8px",
              left: `${27 + col * 27.615}px`,
              top: `${27 + row * 27}px`
            }}
          />
        );
      }
    }
    return dots;
  };

  return (
    <div className="w-full flex items-center justify-center p-8 bg-transparent">
      {/* Main Container - EXACT size 412x412, matching Figma properties */}
      <div 
        className="relative w-[412px] h-[412px] shrink-0 rounded-[40px] overflow-clip bg-[#FBFCFD] shadow-[0px_0px_0px_1.5px_rgba(255,255,255,0.3)]"
        
      >
        {/* Inner white glow overlay specified in Figma */}
        <div className="absolute inset-0 pointer-events-none rounded-[40px] shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.1)] z-50" />

        {/* Pixel-Perfect Dot Matrix Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {renderDots()}
        </div>

        <AnimatePresence mode="wait">
          {/* State 1: IDLE */}
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10"
            >
              <motion.div
                onClick={() => setStatus("generating")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#f7f9fb] border border-[#e6e9ec] border-solid content-stretch flex items-center justify-center left-[calc(50%+0.5px)] px-[24px] py-[16px] rounded-[16px] top-[calc(50%+0.5px)] cursor-pointer"
              >
                <p 
                  className="[word-break:break-word] bg-clip-text font-sans font-medium leading-[1.2] relative shrink-0 text-[16px] text-[transparent] text-left whitespace-nowrap"
                  style={{ 
                    backgroundImage: "linear-gradient(90deg, rgb(219, 113, 0) 0%, rgb(227, 79, 79) 16.346%, rgb(234, 214, 145) 38.462%, rgb(158, 230, 127) 67.788%, rgb(132, 198, 234) 81.25%, rgb(0, 150, 61) 100%), linear-gradient(90deg, rgb(21, 102, 229) 0%, rgb(21, 102, 229) 100%)" 
                  }}
                >
                  Generate
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* State 2: GENERATING */}
          {status === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              className="absolute inset-0 z-20"
            >
              {/* Pulsing Dot - Shrinking and growing per request */}
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-3px)] top-[calc(50%+3px)] size-[66px]">
                <motion.div
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  <div className="absolute left-0 top-0 size-[66px] rounded-[55px] drop-shadow-[0px_10px_5px_rgba(0,0,0,0.2)] bg-transparent" />
                  <div className="absolute left-[7px] top-[7px] size-[52px] rounded-[57.2px] overflow-clip flex items-center justify-center">
                    <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[57.2px] bg-[#FF4B00]" />
                    <Sparkles className="text-white size-[21px] relative z-10" strokeWidth={2.5} />
                    <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_15px_2px_rgba(255,255,255,0.7)]" />
                  </div>
                </motion.div>
              </div>

              {/* Progress Pill */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="absolute left-[30px] top-[351px] bg-white border border-[#D7DADC] border-solid flex items-center justify-center px-[16px] py-[8px] rounded-[40px] overflow-clip"
              >
                <p className="font-sans font-medium text-[#626467] text-[16px] leading-[1.2] relative shrink-0 whitespace-nowrap w-[4ch] text-center">
                  {progress}%
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* State 3: COMPLETED */}
          {status === "completed" && (
            <motion.div
              key="completed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 z-30 cursor-pointer group"
              onClick={handleReset}
            >
              <img
                src="https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=800&auto=format&fit=crop"
                alt="Generated Graphic"
                className="object-cover w-[412px] h-[412px] rounded-[40px] pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-[40px] flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium text-sm opacity-0 transition-opacity"
                >
                  Click to reset
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


