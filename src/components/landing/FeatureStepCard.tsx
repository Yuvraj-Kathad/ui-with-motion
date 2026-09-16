"use client";

import React from "react";
import { FeatureStepItem } from "@/types/featureStep";
import { ShowcaseButtonRenderer } from "@/components/landing/ShowcaseButtonRenderer";

export interface FeatureStepCardProps {
  step: FeatureStepItem;
  className?: string;
}

export function FeatureStepCard({ step, className = "" }: FeatureStepCardProps) {
  return (
    <div
      className={`flex flex-col gap-[23px] items-start w-full ${className}`}
      data-node-id={`step-card-${step.stepNumber}`}
    >
      {/* Visual Preview Frame (Figma: h-[294px], bg-[#FBFCFD], border-[#B7BABD], rounded-[48px]) */}
      <div className="bg-[#FBFCFD] border border-[#B7BABD] rounded-[48px] h-[294px] w-full flex items-center justify-center relative overflow-hidden transition-colors duration-200 hover:border-[#7D7F82]">
        <ShowcaseButtonRenderer componentKey={step.componentKey} />
      </div>

      {/* Text Copy Frame (Figma: 12px gap, 20px Bold Title, 16px Medium Description) */}
      <div className="flex flex-col gap-[12px] items-start text-left w-full max-w-[380px]">
        <h3 className="font-sans font-bold text-[20px] text-black leading-[1.2]">
          {step.title}
        </h3>
        <p className="font-sans font-medium text-[16px] text-[#7D7F82] leading-[1.2]">
          {step.description}
        </p>
      </div>
    </div>
  );
}
