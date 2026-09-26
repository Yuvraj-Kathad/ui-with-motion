"use client";

import React from "react";
import { useBuilder } from "./BuilderContext";
import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Upload Code" },
  { id: 2, label: "Detect Elements" },
  { id: 3, label: "Connect" },
  { id: 4, label: "Review" },
  { id: 5, label: "Publish" },
];

export function StepIndicator() {
  const { state } = useBuilder();
  const { currentStep } = state;

  return (
    <div className="w-full py-6 px-8 border-b border-[#E9EAEB] bg-white">
      <div className="flex items-center justify-between max-w-4xl mx-auto relative">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#E9EAEB] -translate-y-1/2 z-0" />
        
        {STEPS.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition-colors ${
                  isCompleted 
                    ? "bg-[#111111] text-white" 
                    : isCurrent 
                      ? "bg-[#111111] text-white border-2 border-white ring-2 ring-[#111111]" 
                      : "bg-white border-2 border-[#E9EAEB] text-[#888888]"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span 
                className={`text-xs font-medium absolute -bottom-6 whitespace-nowrap ${
                  isCurrent ? "text-[#111111]" : "text-[#888888]"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
