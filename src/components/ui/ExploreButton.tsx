"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface ExploreButtonProps {
  href?: string;
  label?: string;
  onClick?: () => void;
  className?: string;
}

export function ExploreButton({
  href = "/components",
  label = "Explore component",
  onClick,
  className = "",
}: ExploreButtonProps) {
  const content = (
    <div
      className={`group inline-flex items-center gap-2 bg-[#F5F9FF] hover:bg-[#EAF2FF] transition-all duration-200 pl-6 pr-0 py-0 rounded-[79px] cursor-pointer select-none border border-[#EAF2FF] shadow-xs active:scale-[0.98] ${className}`}
    >
      <span className="font-sans font-medium text-[16px] text-black leading-[1.2] whitespace-nowrap">
        {label}
      </span>
      <div className="bg-[#1F2123] group-hover:bg-black rounded-full size-[56px] flex items-center justify-center p-[7px] shrink-0 transition-colors">
        <div className="relative size-[25px] transition-transform duration-200 group-hover:translate-x-1">
          <Image
            src="/icons/arrow-right.svg"
            alt=""
            width={25}
            height={25}
            className="size-full object-contain"
          />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="p-0 bg-transparent border-none">
      {content}
    </button>
  );
}
