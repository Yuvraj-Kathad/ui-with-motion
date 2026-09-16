import React from "react";
import { Hero } from "@/components/landing/Hero";
import { BentoSection } from "@/components/landing/BentoSection";
import { Container } from "@/components/ui/Container";

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 w-full">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Bento Grid / Button Showcase Section */}
      <BentoSection />

      {/* Placeholder canvas for upcoming sections (Component Picker, Callout) */}
      <div className="py-12 border-t border-[#DEE1E4]/40 bg-[#FBFCFD]">
        <Container>
          <div className="rounded-[32px] border border-dashed border-[#DEE1E4] p-8 text-center text-[#7D7F82] max-w-xl mx-auto">
            <span className="inline-block size-2 rounded-full bg-[#4FBE6B] mr-2" />
            <span className="font-sans font-medium text-sm">
              Hero & Bento Grid Sections Active • Next: Component Picker Section (Section 3)
            </span>
          </div>
        </Container>
      </div>
    </div>
  );
}
