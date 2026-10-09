"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const emotions = ["neutral", "happy", "sad", "crying", "laughing", "confused"];

export default function InteractiveFace() {
  const [emotionIndex, setEmotionIndex] = useState(0);
  const currentEmotion = emotions[emotionIndex];

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const eyeX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const eyeY = useTransform(smoothY, [-1, 1], [-12, 12]);
  const faceX = useTransform(smoothX, [-1, 1], [-4, 4]);
  const faceY = useTransform(smoothY, [-1, 1], [-4, 4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize -1 to 1 based on window width to make it react across the screen
      const x = (e.clientX - centerX) / (window.innerWidth / 2);
      const y = (e.clientY - centerY) / (window.innerHeight / 2);

      mouseX.set(Math.max(-1, Math.min(1, x)));
      mouseY.set(Math.max(-1, Math.min(1, y)));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleFaceClick = () => {
    setEmotionIndex((prev) => (prev + 1) % emotions.length);
  };

  const leftEyeVariants = {
    neutral: { width: 24, height: 48, y: 0, rotate: 0, borderRadius: "24px" },
    happy: { width: 32, height: 16, y: -8, rotate: -15, borderRadius: "16px" },
    sad: { width: 24, height: 32, y: 12, rotate: 10, borderRadius: "16px" },
    crying: { width: 24, height: 24, y: 10, rotate: 15, borderRadius: "12px" },
    laughing: { width: 36, height: 12, y: -12, rotate: -25, borderRadius: "12px" },
    confused: { width: 36, height: 36, y: -5, rotate: 0, borderRadius: "36px" },
  };

  const rightEyeVariants = {
    neutral: { width: 24, height: 48, y: 0, rotate: 0, borderRadius: "24px" },
    happy: { width: 32, height: 16, y: -8, rotate: 15, borderRadius: "16px" },
    sad: { width: 24, height: 32, y: 12, rotate: -10, borderRadius: "16px" },
    crying: { width: 24, height: 24, y: 10, rotate: -15, borderRadius: "12px" },
    laughing: { width: 36, height: 12, y: -12, rotate: 25, borderRadius: "12px" },
    confused: { width: 16, height: 16, y: 5, rotate: 0, borderRadius: "16px" },
  };

  const mouthVariants = {
    neutral: { width: 48, height: 16, y: 0, rotate: 0, borderRadius: "16px" },
    happy: { width: 64, height: 32, y: 10, rotate: 0, borderRadius: "8px 8px 32px 32px" },
    sad: { width: 56, height: 24, y: 24, rotate: 0, borderRadius: "24px 24px 8px 8px" },
    crying: { width: 64, height: 32, y: 28, rotate: 0, borderRadius: "32px 32px 12px 12px" },
    laughing: { width: 72, height: 56, y: 10, rotate: 0, borderRadius: "12px 12px 48px 48px" },
    confused: { width: 32, height: 12, y: 15, rotate: -25, borderRadius: "16px" },
  };

  return (
    <div className="w-full flex items-center justify-center p-8 bg-transparent" ref={containerRef}>
      <motion.div
        className="relative flex items-center justify-center cursor-pointer"
        style={{ width: "240px", height: "240px" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={handleFaceClick}
      >
        {/* Ears from Figma */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/images/ears/left_ear.svg?v=2" 
            className="absolute max-w-none"
            style={{ width: "335px", height: "335px", left: "-80px", top: "-82px", transform: "scaleX(-1)" }}
            alt=""
          />
          <img 
            src="/images/ears/right_ear.svg?v=2" 
            className="absolute max-w-none"
            style={{ width: "335px", height: "335px", left: "-12px", top: "-82px" }}
            alt=""
          />
        </div>

        {/* Face Plate */}
        <div 
          className="absolute inset-0 overflow-hidden z-10"
          style={{
            border: "24px solid rgba(31,33,35,0.33)",
            borderRadius: "56px",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
          
          <motion.div
            className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none"
          style={{ x: faceX, y: faceY }}
        >
          <div className="flex gap-10 mb-6 relative z-10">
            {/* Left Eye Wrapper for tracking */}
            <motion.div style={{ x: eyeX, y: eyeY }} className="w-[36px] h-[48px] flex items-center justify-center">
              <motion.div
                variants={leftEyeVariants}
                animate={currentEmotion}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                style={{ backgroundColor: "#EC4899" }}
              />
            </motion.div>

            {/* Right Eye Wrapper for tracking */}
            <motion.div style={{ x: eyeX, y: eyeY }} className="w-[36px] h-[48px] flex items-center justify-center">
              <motion.div
                variants={rightEyeVariants}
                animate={currentEmotion}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                style={{ backgroundColor: "#EC4899" }}
              />
            </motion.div>
          </div>

          {/* Mouth */}
          <motion.div
            variants={mouthVariants}
            animate={currentEmotion}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative z-10" style={{ backgroundColor: "#EC4899" }}
          />

          {/* Tears for Crying Emotion */}
          {currentEmotion === "crying" && (
            <>
              <motion.div
                className="absolute bg-blue-500 rounded-b-full rounded-t-sm w-3 h-4 left-[30%]"
                initial={{ opacity: 0, top: "45%" }}
                animate={{ opacity: [0, 1, 0], top: ["45%", "65%", "75%"] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
              <motion.div
                className="absolute bg-blue-500 rounded-b-full rounded-t-sm w-3 h-4 right-[30%]"
                initial={{ opacity: 0, top: "45%" }}
                animate={{ opacity: [0, 1, 0], top: ["45%", "65%", "75%"] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.6 }}
              />
            </>
          )}        </motion.div>
        </div>
      </motion.div>
    </div>
  );
}






