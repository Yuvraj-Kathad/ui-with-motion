"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ExploreButton } from "@/components/ui/ExploreButton";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
      <Container>
        <div className="flex flex-col items-center justify-center text-center max-w-[792px] mx-auto">
          {/* Title & Subtitle Copy */}
          <div className="flex flex-col items-center gap-3 md:gap-[12px] mb-8 md:mb-[32px] w-full">
            <h1 className="font-sans font-bold text-[32px] sm:text-[44px] md:text-[61px] leading-[1.12] text-black tracking-[-0.02em] text-balance">
              Premium UI, starting here
            </h1>
            <p className="font-sans font-normal text-[16px] sm:text-[20px] md:text-[25px] leading-[1.5] text-[#7D7F82] max-w-[325px] sm:max-w-[600px] md:max-w-[778px] text-balance">
              Discover 50+ thoughtfully crafted UI components to explore, learn
              from, and get inspired.
            </p>
          </div>

          {/* Explore Component CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <ExploreButton href="#components" label="Explore component" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
