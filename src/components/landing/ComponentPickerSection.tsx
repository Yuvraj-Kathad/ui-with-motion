import React from "react";
import { Container } from "@/components/ui/Container";
import { FeatureStepCard } from "@/components/landing/FeatureStepCard";
import { FEATURE_STEPS } from "@/data/featureSteps";

export function ComponentPickerSection() {
  return (
    <section id="component-picker" className="w-full py-16 md:py-20 lg:py-24">
      <Container>
        {/* Section Heading (Figma: text-[61px] on desktop, 80px bottom spacing) */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="font-sans font-bold text-[32px] sm:text-[44px] md:text-[61px] leading-[1.12] text-black tracking-[-0.02em] text-balance">
            Pick a component. Make it yours.
          </h2>
        </div>

        {/* 3-Step Feature Cards Grid (Figma: max-w-[1300px], 3-col 418px each, 23px gap) */}
        <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-[23px]">
          {FEATURE_STEPS.map((step) => (
            <FeatureStepCard key={step.id} step={step} />
          ))}
        </div>
      </Container>
    </section>
  );
}
