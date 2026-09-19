"use client";

import React from "react";
import { ComponentCard } from "@/components/ui/ComponentCard";
import { ChevronDown, Heart, Star, Send, ArrowRight } from "lucide-react";

const FigmaIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
  </svg>
);

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useRef, useEffect } from "react";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FilterDropdownProps = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (newSelected: string[]) => void;
};

function FilterDropdown({ label, options, selected, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={ref} className="relative z-20" onKeyDown={handleKeyDown}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-[#F7F9FB] border border-[#B7BABD] rounded-[36px] pl-[16px] pr-[12px] py-[12px] flex items-center gap-[8px] overflow-clip hover:bg-[#EEF1F4] transition-colors"
      >
        <span className="font-sans font-medium text-[16px] leading-[1.2] text-black whitespace-nowrap">{label}</span>
        <ChevronDown size={24} className={`text-[#1F2123] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[calc(100%+8px)] left-0 w-[201px] bg-[#F7F9FB] border border-[#B7BABD] rounded-[16px] flex flex-col items-start overflow-clip shadow-lg"
          >
            {options.map((option) => {
              const isChecked = selected.includes(option);
              return (
                <div 
                  key={option} 
                  onClick={() => {
                    onChange(isChecked ? selected.filter(o => o !== option) : [...selected, option]);
                  }} 
                  className="w-full flex items-center justify-between p-[12px] cursor-pointer hover:bg-[#EEF1F4] transition-colors group"
                >
                  <span className="font-sans font-medium text-[16px] leading-[1.2] text-black whitespace-nowrap">{option}</span>
                  <div className={`size-[20px] rounded-[4px] border flex items-center justify-center transition-colors ${isChecked ? 'bg-black border-black' : 'border-[#B7BABD] group-hover:border-[#7D7F82] bg-white'}`}>
                    {isChecked && <Check size={14} className="text-white" strokeWidth={3} />}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ComponentsContent() {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search")?.toLowerCase() || "";
  const [isFigmaActive, setIsFigmaActive] = useState(false);
  
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedLicence, setSelectedLicence] = useState<string[]>([]);
  const [selectedCode, setSelectedCode] = useState<string[]>([]);

  const matches = (title: string, tags: string[] = []) => {
    if (!search) return true;
    return (
      title.toLowerCase().includes(search) ||
      tags.some((tag) => tag.toLowerCase().includes(search))
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#FBFCFD] pb-32">
      {/* Header Toolbar Region */}
      <div className="w-full max-w-[1440px] mx-auto px-[70px] py-[40px] flex flex-col gap-[20px]">
        <div className="flex flex-wrap items-center gap-[18px]">
          {/* Dropdown Filters */}
          <FilterDropdown label="States" options={["Default", "Hover", "Loading", "Pressed"]} selected={selectedStates} onChange={setSelectedStates} />
          <FilterDropdown label="Licence" options={["Free", "Premium"]} selected={selectedLicence} onChange={setSelectedLicence} />
          <FilterDropdown label="Code" options={["HTML & CSS", "Next Js"]} selected={selectedCode} onChange={setSelectedCode} />
          
          {/* Figma Button */}
          <button 
            onClick={() => setIsFigmaActive(!isFigmaActive)}
            className="bg-[#F7F9FB] border border-[#B7BABD] rounded-[36px] pl-[16px] pr-[12px] py-[8px] flex items-center gap-[8px] overflow-clip hover:bg-[#EEF1F4] transition-colors"
          >
            <div className="size-[32px] flex items-center justify-center shrink-0">
              <FigmaIcon size={24} className="text-black" />
            </div>
            <span className="font-sans font-medium text-[16px] leading-[1.2] text-black whitespace-nowrap">Figma</span>
            {isFigmaActive && (
              <div className="size-[28px] bg-[#EEF1F4] rounded-full flex items-center justify-center shrink-0 ml-[4px]">
                <X size={16} className="text-[#1F2123]" />
              </div>
            )}
          </button>
        </div>

        {/* Selected Chips Row */}
        {(selectedStates.length > 0 || selectedLicence.length > 0 || selectedCode.length > 0) && (
          <div className="flex flex-wrap items-center gap-[13px]">
            {selectedStates.length > 0 && (
              <div className="bg-[#EEF1F4] border border-[#B7BABD] rounded-[36px] pl-[16px] pr-[12px] py-[8px] flex items-center gap-[8px]">
                <span className="font-sans font-medium text-[16px] leading-[1.2] text-black whitespace-nowrap">
                  {selectedStates.join(", ")}
                </span>
                <button onClick={() => setSelectedStates([])} className="size-[32px] flex items-center justify-center rounded-full hover:bg-black/5 transition-colors shrink-0">
                   <X size={16} className="text-[#1F2123]" />
                </button>
              </div>
            )}
            {selectedLicence.length > 0 && (
              <div className="bg-[#EEF1F4] border border-[#B7BABD] rounded-[36px] pl-[16px] pr-[12px] py-[8px] flex items-center gap-[8px]">
                <span className="font-sans font-medium text-[16px] leading-[1.2] text-black whitespace-nowrap">
                  {selectedLicence.join(", ")}
                </span>
                <button onClick={() => setSelectedLicence([])} className="size-[32px] flex items-center justify-center rounded-full hover:bg-black/5 transition-colors shrink-0">
                   <X size={16} className="text-[#1F2123]" />
                </button>
              </div>
            )}
            {selectedCode.length > 0 && (
              <div className="bg-[#EEF1F4] border border-[#B7BABD] rounded-[36px] pl-[16px] pr-[12px] py-[8px] flex items-center gap-[8px]">
                <span className="font-sans font-medium text-[16px] leading-[1.2] text-black whitespace-nowrap">
                  {selectedCode.join(", ")}
                </span>
                <button onClick={() => setSelectedCode([])} className="size-[32px] flex items-center justify-center rounded-full hover:bg-black/5 transition-colors shrink-0">
                   <X size={16} className="text-[#1F2123]" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Component Grid */}
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-[70px]">
        {search && (
          <div className="mb-6">
            <h2 className="font-sans text-[20px] text-black">
              Search results for: <span className="font-bold">&quot;{search}&quot;</span>
            </h2>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-[19px] justify-center lg:justify-start">
          
          {/* Card 1: Star Button */}
          {matches("Star button", ["Buttons"]) && (
            <ComponentCard id="star-button" title="Star button">
              {({ playState, customStyles }) => (
                <button 
                  className={`relative border border-[#E7E7E7] px-[24px] py-[12px] rounded-full shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden group transition-all duration-300 ${playState === 'hover' ? 'scale-105 shadow-md' : ''} ${playState === 'active' ? 'scale-95 bg-[#F7F9FB]' : ''} hover:scale-105 ${customStyles ? 'text-white' : 'bg-white text-black'}`}
                >
                  <span className="relative z-10 font-sans">
                    {playState === 'loading' ? 'Processing...' : 'Continue'}
                  </span>
                  <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80px] h-[40px] rounded-full transition-colors duration-300 blur-[12px] ${playState === 'hover' || playState === 'loading' ? 'bg-[#9CC2FF]/80' : 'bg-[#9CC2FF]/40'} group-hover:bg-[#9CC2FF]/60`}></div>
                </button>
              )}
            </ComponentCard>
          )}

          {/* Card 2: Continue Arrow */}
          {matches("Icon button", ["Buttons"]) && (
            <ComponentCard id="icon-button" title="Icon button">
              {({ playState }) => (
                <button 
                  className={`relative h-[44px] w-[145px] rounded-full flex items-center shadow-sm border border-[#EAF2FF] transition-all duration-300 ${playState === 'hover' ? 'scale-105 shadow-md' : ''} ${playState === 'active' ? 'scale-95' : ''} hover:scale-105 bg-[#F5F9FF]`}
                >
                  <span className={`pl-5 font-sans text-black`}>
                    {playState === 'loading' ? 'Loading' : 'Continue'}
                  </span>
                  <div className={`absolute right-0 top-0 bottom-0 aspect-square rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${playState === 'hover' ? 'scale-110 translate-x-1' : ''} ${playState === 'loading' ? 'animate-pulse' : ''} bg-[#1566E5] text-white`}>
                    <ArrowRight size={18} />
                  </div>
                </button>
              )}
            </ComponentCard>
          )}

          {/* Card 3: Continue Glow */}
          {matches("Glow button", ["Buttons"]) && (
            <ComponentCard id="glow-button" title="Glow button">
              {({ playState }) => (
                <button className={`relative bg-[#F9F9F9] border px-[28px] py-[12px] rounded-full overflow-hidden flex items-center justify-center group transition-colors ${playState === 'hover' || playState === 'active' ? 'border-[#CBCED1]' : 'border-[#DEE1E4]'}`}>
                  <span className="font-sans font-medium text-[16px] text-black relative z-10">
                    {playState === 'loading' ? 'Saving...' : 'Continue'}
                  </span>
                  <div className={`absolute right-[-5px] top-1/2 -translate-y-1/2 w-[25px] h-[60px] bg-[#9CC2FF]/50 blur-[10px] rotate-[33deg] transition-transform duration-500 ${playState === 'hover' ? 'translate-x-[-15px]' : ''} ${playState === 'loading' ? 'translate-x-[-120px] duration-1000' : ''} group-hover:translate-x-[-10px]`}></div>
                </button>
              )}
            </ComponentCard>
          )}

          {/* Card 4: Continue Union */}
          {matches("Union button", ["Buttons"]) && (
            <ComponentCard id="union-button" title="Union button">
              {({ playState }) => (
                <button className={`relative bg-white border border-[#DEE1E4] h-[46px] px-[28px] rounded-[16px] flex items-center justify-center transition-all duration-300 ${playState === 'hover' ? 'shadow-md -translate-y-1' : 'shadow-sm'} ${playState === 'active' ? 'shadow-inner bg-[#F7F9FB] translate-y-0' : ''} hover:shadow-md`}>
                  <span className="font-sans font-medium text-[16px] text-[#1F2123]">
                    {playState === 'loading' ? 'Wait...' : 'Continue'}
                  </span>
                </button>
              )}
            </ComponentCard>
          )}

          {/* Card 5: Magic Button */}
          {matches("Magic button", ["Buttons"]) && (
            <ComponentCard id="magic-button" title="Magic button">
              {({ playState }) => (
                <button className={`bg-[#EEF1F4] border transition-all duration-300 px-[24px] py-[12px] rounded-full flex gap-2 items-center ${playState === 'hover' ? 'border-[#DEE1E4] shadow-sm scale-105' : 'border-transparent'} ${playState === 'active' ? 'scale-95 bg-[#DEE1E4]' : ''} hover:border-[#DEE1E4]`}>
                  <Star size={18} className={`transition-all ${playState === 'hover' || playState === 'loading' ? 'text-yellow-500 fill-yellow-500' : 'text-[#1F2123]'}`} />
                  <span className="font-sans font-medium text-[16px] text-[#1F2123]">Magic</span>
                </button>
              )}
            </ComponentCard>
          )}

          {/* Card 6: Accept Button */}
          {matches("Accept button", ["Buttons"]) && (
            <ComponentCard id="accept-button" title="Accept button">
              {({ playState }) => (
                <button className={`relative bg-[#F6CC44] px-[28px] py-[12px] rounded-full flex items-center justify-center group transition-all duration-300 ${playState === 'hover' ? 'scale-105 shadow-[0_8px_20px_rgba(246,204,68,0.4)]' : 'shadow-[0_4px_14px_rgba(246,204,68,0.3)]'} ${playState === 'active' ? 'scale-95 shadow-none' : ''} hover:scale-105`}>
                  <div className={`absolute inset-0 rounded-full bg-white/20 transition-opacity ${playState === 'hover' ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}></div>
                  <span className="font-sans font-medium text-[16px] text-[#1F2123] relative z-10">
                    {playState === 'loading' ? 'Accepting' : 'Accept'}
                  </span>
                </button>
              )}
            </ComponentCard>
          )}

          {/* Card 7: Like Button */}
          {matches("Like button", ["Buttons"]) && (
            <ComponentCard id="like-button" title="Like button">
              {({ playState }) => (
                <button className={`bg-[#FBFCFD] border border-[#DEE1E4] px-[24px] py-[12px] rounded-full flex gap-[10px] items-center transition-all duration-300 shadow-sm ${playState === 'hover' ? 'bg-[#F7F9FB] scale-105' : ''} ${playState === 'active' || playState === 'loading' ? 'bg-[#FFEBEC] border-[#FFB3B8]' : ''} hover:bg-[#F7F9FB]`}>
                  <Heart size={18} className={`transition-transform duration-300 text-[#CC0615] ${playState === 'active' || playState === 'loading' ? 'fill-[#CC0615] scale-125' : (playState === 'hover' ? 'fill-[#CC0615]/50' : 'fill-transparent')}`} />
                  <span className="font-sans font-medium text-[16px] text-[#1F2123]">
                    {playState === 'loading' ? 'Liked' : 'Like'}
                  </span>
                </button>
              )}
            </ComponentCard>
          )}

          {/* Card 8: Generate Button */}
          {matches("Generate button", ["Buttons"]) && (
            <ComponentCard id="generate-button" title="Generate button">
              {({ playState }) => (
                <button className={`relative bg-[#0E3067] px-[28px] py-[12px] rounded-full flex items-center justify-center group overflow-hidden transition-all duration-300 ${playState === 'hover' ? 'shadow-[#0E3067]/30 shadow-xl scale-105' : 'shadow-lg'} ${playState === 'active' ? 'scale-95' : ''}`}>
                  <div className={`absolute top-[-5px] left-[-2px] h-[120%] bg-[#1566E5]/20 blur-[8px] rounded-full transition-all duration-500 ${playState === 'hover' || playState === 'loading' ? 'w-[100%]' : 'w-[60%]'} group-hover:w-[100%]`}></div>
                  <span className="font-sans font-medium text-[16px] text-white relative z-10">
                    {playState === 'loading' ? 'Generating...' : 'Generate'}
                  </span>
                </button>
              )}
            </ComponentCard>
          )}

          {/* Card 9: Send Button */}
          {matches("Send button", ["Buttons"]) && (
            <ComponentCard id="send-button" title="Send button">
              {({ playState }) => (
                <button className={`bg-[#F5F9FF] border border-[#EAF2FF] px-[26px] py-[12px] rounded-full flex gap-[12px] items-center transition-all duration-300 ${playState === 'hover' ? 'bg-[#EAF2FF] scale-105 shadow-sm' : ''} ${playState === 'active' ? 'scale-95' : ''} hover:bg-[#EAF2FF]`}>
                  <Send size={18} className={`text-[#1566E5] transition-transform duration-500 ${playState === 'loading' ? 'translate-x-10 opacity-0' : (playState === 'hover' ? 'translate-x-1 -translate-y-1' : '')}`} />
                  <span className="font-sans font-medium text-[16px] text-[#1F2123]">
                    {playState === 'loading' ? 'Sent!' : 'Send'}
                  </span>
                </button>
              )}
            </ComponentCard>
          )}

        </div>
      </div>
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-[#FBFCFD]" />}>
      <ComponentsContent />
    </Suspense>
  );
}
