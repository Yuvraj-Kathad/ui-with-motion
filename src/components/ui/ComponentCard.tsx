"use client";

import React, { useState, useEffect } from 'react';
import { Play, Bookmark, Square } from 'lucide-react';

export interface ComponentTag {
  label: string;
}

export interface ComponentCardProps {
  title: string;
  tags?: ComponentTag[];
  children: React.ReactNode | ((props: { isPlaying: boolean; playState: 'idle' | 'hover' | 'active' | 'loading' }) => React.ReactNode);
}

const DEFAULT_TAGS = [{ label: "Html & css" }, { label: "Next js" }, { label: "Figma" }];

export function ComponentCard({ title, tags = DEFAULT_TAGS, children }: ComponentCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playState, setPlayState] = useState<'idle' | 'hover' | 'active' | 'loading'>('idle');

  useEffect(() => {
    if (!isPlaying) {
      setTimeout(() => setPlayState('idle'), 0);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let isCancelled = false;

    const runSequence = async () => {
      setPlayState('hover');
      await new Promise(r => setTimeout(r, 800));
      if (isCancelled) return;
      
      setPlayState('active');
      await new Promise(r => setTimeout(r, 400));
      if (isCancelled) return;
      
      setPlayState('loading');
      await new Promise(r => setTimeout(r, 1200));
      if (isCancelled) return;
      
      setPlayState('idle');
      timeoutId = setTimeout(runSequence, 800);
    };

    runSequence();

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isPlaying]);

  return (
    <div className="bg-[#FBFCFD] border border-[#B7BABD] flex flex-col gap-px items-start relative rounded-[12px] w-full max-w-[420px] overflow-clip transition-shadow hover:shadow-md">
      {/* Top action bar */}
      <div className="flex gap-[6px] items-center justify-end p-[8px] w-full shrink-0">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
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
          onClick={() => setIsSaved(!isSaved)}
          className={`flex items-center justify-center size-[34px] transition-colors ${isSaved ? 'text-black' : 'text-[#B0B0B0] hover:text-black'}`}
          aria-label={isSaved ? "Saved" : "Bookmark"}
        >
          <Bookmark size={20} className={isSaved ? "fill-current stroke-current" : "fill-transparent stroke-current stroke-2"} />
        </button>
      </div>
      
      {/* Component Display Area */}
      <div className="h-[151px] w-full relative flex items-center justify-center shrink-0 overflow-clip">
        {typeof children === 'function' ? children({ isPlaying, playState }) : children}
      </div>
      
      {/* Footer Area */}
      <div className="flex items-center justify-between px-[20px] py-[12px] w-full shrink-0">
        <h3 className="font-sans font-medium text-[20px] leading-[1.2] text-black whitespace-nowrap">
          {title}
        </h3>
        <div className="flex gap-[4px] h-[24px] items-center">
          {tags.map((tag, i) => (
            <div key={i} className="bg-white border border-[#EEF1F4] flex h-full items-center p-[4px] rounded-[4px] overflow-hidden">
              <span className="font-sans font-normal text-[13px] leading-[1.2] text-[#7D7F82] whitespace-nowrap">
                {tag.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

