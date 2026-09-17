import React from "react";
import { Hero } from "@/components/landing/Hero";
import { BentoSection } from "@/components/landing/BentoSection";
import { ComponentPickerSection } from "@/components/landing/ComponentPickerSection";
import { PreFooterCallout } from "@/components/landing/PreFooterCallout";

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 w-full">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Bento Grid / Button Showcase Section */}
      <BentoSection />

      {/* 3. Component Picker / 3-Step Feature Section */}
      <ComponentPickerSection />

      {/* 4. Pre-Footer Callout Section */}
      <PreFooterCallout />
    </div>
  );
}
