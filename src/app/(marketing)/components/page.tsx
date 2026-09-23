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
    <div ref={ref} className={`relative ${isOpen ? 'z-50' : 'z-20'}`} onKeyDown={handleKeyDown}>
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

import { ComponentModalPublic } from "@/components/ui/ComponentModalPublic";
import { Play, Bookmark, Square } from "lucide-react";

type ComponentItem = {
  id: string;
  title: string;
  status: string;
  htmlCode: string;
  cssCode: string;
  nextjsCode: string;
};

function ComponentsContent() {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search")?.toLowerCase() || "";
  const [isFigmaActive, setIsFigmaActive] = useState(false);
  
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedLicence, setSelectedLicence] = useState<string[]>([]);
  const [selectedCode, setSelectedCode] = useState<string[]>([]);

  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [activeModalComponent, setActiveModalComponent] = useState<ComponentItem | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const loadComponents = () => {
      const saved = localStorage.getItem("ui_motion_components");
      if (saved) {
        const all = JSON.parse(saved) as ComponentItem[];
        setComponents(all.filter(c => c.status === "Publish"));
      }
      
      const bookmarks = JSON.parse(localStorage.getItem("saved_components") || "[]");
      setSavedIds(bookmarks);
      
      setIsLoaded(true);
    };

    loadComponents();
    window.addEventListener("components_updated", loadComponents);
    window.addEventListener("saved_components_changed", loadComponents);
    return () => {
      window.removeEventListener("components_updated", loadComponents);
      window.removeEventListener("saved_components_changed", loadComponents);
    }
  }, []);

  const getPreviewHtml = (comp: ComponentItem) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ::-webkit-scrollbar { display: none; }
          * { -ms-overflow-style: none; scrollbar-width: none; }
          ${comp.cssCode}
        </style>
      </head>
      <body style="margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background-color: transparent;">
        ${comp.htmlCode}
      </body>
      </html>
    `;
  };

  const filteredComponents = components.filter(comp => {
    if (!search) return true;
    return comp.title.toLowerCase().includes(search);
  });

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const isSaved = savedIds.includes(id);
    const newSaved = isSaved ? savedIds.filter(s => s !== id) : [...savedIds, id];
    localStorage.setItem("saved_components", JSON.stringify(newSaved));
    setSavedIds(newSaved);
    window.dispatchEvent(new Event("saved_components_changed"));
  };

  return (
    <div className="w-full min-h-screen bg-[#FBFCFD] pb-32">
      <div className="w-full max-w-[1440px] mx-auto px-[20px] lg:px-[70px] py-[40px] flex flex-col gap-[20px]">
        <div className="flex flex-wrap items-center gap-[18px]">
          <FilterDropdown label="States" options={["Default", "Hover", "Loading", "Pressed"]} selected={selectedStates} onChange={setSelectedStates} />
          <FilterDropdown label="Licence" options={["Free", "Premium"]} selected={selectedLicence} onChange={setSelectedLicence} />
          <FilterDropdown label="Code" options={["HTML & CSS", "Next Js"]} selected={selectedCode} onChange={setSelectedCode} />
          
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
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-[70px]">
        {search && (
          <div className="mb-6">
            <h2 className="font-sans text-[20px] text-black">
              Search results for: <span className="font-bold">&quot;{search}&quot;</span>
            </h2>
          </div>
        )}
        
        {isLoaded && filteredComponents.length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center">
            <p className="text-[20px] text-[#7D7F82] font-medium">No published components found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] justify-center lg:justify-start">
            {filteredComponents.map((comp) => {
              const isSaved = savedIds.includes(comp.id);
              const isPlaying = playingId === comp.id;
              
              return (
                <div 
                  key={comp.id}
                  onClick={() => setActiveModalComponent(comp)}
                  className="bg-[#FBFCFD] border border-[#B7BABD] flex flex-col gap-px items-start relative rounded-[12px] w-full overflow-clip hover:shadow-md transition-shadow group cursor-pointer h-[253px]"
                >
                  {/* Top action bar */}
                  <div className="flex gap-[6px] items-center justify-end p-[8px] w-full shrink-0 relative z-10 bg-transparent">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setPlayingId(isPlaying ? null : comp.id); }}
                      className={`flex items-center justify-center size-[34px] transition-colors ${isPlaying ? 'text-[#1566E5]' : 'text-[#B0B0B0] hover:text-black'}`} 
                      aria-label={isPlaying ? "Stop" : "Play"}
                    >
                      {isPlaying ? (
                        <Square size={20} className="fill-current stroke-current" />
                      ) : (
                        <Play size={20} className="fill-transparent stroke-current stroke-2" />
                      )}
                    </button>
                    <button 
                      onClick={(e) => toggleSave(e, comp.id)}
                      className={`flex items-center justify-center size-[34px] transition-colors ${isSaved ? 'text-black' : 'text-[#B0B0B0] hover:text-black'}`}
                      aria-label={isSaved ? "Saved" : "Bookmark"}
                    >
                      <Bookmark size={20} className={isSaved ? "fill-current stroke-current" : "fill-transparent stroke-current stroke-2"} />
                    </button>
                  </div>
                  
                  {/* Component Display Area */}
                  <div className="h-[151px] w-full relative flex items-center justify-center shrink-0 overflow-hidden bg-transparent pointer-events-none">
                    <iframe 
                      srcDoc={getPreviewHtml(comp)}
                      className="absolute inset-0 w-full h-full border-none pointer-events-none"
                      tabIndex={-1}
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                  
                  {/* Footer Area */}
                  <div className="flex items-center justify-between px-[20px] py-[12px] w-full shrink-0 relative z-10 bg-transparent h-[48px]">
                    <h3 className="font-sans font-medium text-[20px] leading-[1.2] text-black whitespace-nowrap truncate">
                      {comp.title}
                    </h3>
                    <div className="flex gap-[4px] h-[24px] items-center">
                      {comp.htmlCode && (
                        <div className="bg-white border border-[#EEF1F4] flex h-full items-center p-[4px] px-2 rounded-[4px] overflow-hidden">
                          <span className="font-sans font-normal text-[13px] leading-[1.2] text-[#7D7F82] whitespace-nowrap">
                            Html & css
                          </span>
                        </div>
                      )}
                      {comp.nextjsCode && (
                        <div className="bg-white border border-[#EEF1F4] flex h-full items-center p-[4px] px-2 rounded-[4px] overflow-hidden">
                          <span className="font-sans font-normal text-[13px] leading-[1.2] text-[#7D7F82] whitespace-nowrap">
                            Next js
                          </span>
                        </div>
                      )}
                      <div className="bg-white border border-[#EEF1F4] flex h-full items-center p-[4px] px-2 rounded-[4px] overflow-hidden">
                        <span className="font-sans font-normal text-[12px] leading-[1.2] text-[#7D7F82] whitespace-nowrap">
                          Figma
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {activeModalComponent && (
        <ComponentModalPublic
          component={activeModalComponent}
          isOpen={!!activeModalComponent}
          onClose={() => setActiveModalComponent(null)}
        />
      )}
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
