"use client";

import React, { forwardRef } from "react";
import Image from "next/image";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  onSearchClick?: () => void;
  className?: string;
  isTriggerOnly?: boolean;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      placeholder = "Search ui components",
      className = "",
      isTriggerOnly = false,
      onSearchClick,
      ...props
    },
    ref
  ) => {
    if (isTriggerOnly) {
      return (
        <button
          type="button"
          onClick={onSearchClick}
          className={`bg-[#EEF1F4] border border-[#E7E7E7] flex items-center gap-3 px-4 py-3 rounded-[32px] text-left cursor-pointer hover:border-[#CBCED1] transition-all select-none ${className}`}
        >
          <div className="relative shrink-0 size-[20px] sm:size-[24px]">
            <Image
              src="/icons/search.svg"
              alt="Search"
              width={24}
              height={24}
              className="size-full object-contain"
            />
          </div>
          <span className="font-sans font-medium text-[15px] sm:text-[16px] leading-[1.2] text-[#B0B0B0] truncate">
            {placeholder}
          </span>
        </button>
      );
    }

    return (
      <div
        className={`bg-[#EEF1F4] border border-[#E7E7E7] focus-within:border-[#B0B0B0] focus-within:bg-white flex items-center gap-3 px-4 py-3 rounded-[32px] transition-all ${className}`}
      >
        <div className="relative shrink-0 size-[20px] sm:size-[24px] pointer-events-none">
          <Image
            src="/icons/search.svg"
            alt="Search"
            width={24}
            height={24}
            className="size-full object-contain"
          />
        </div>
        <input
          ref={ref}
          type="search"
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none font-sans font-medium text-[15px] sm:text-[16px] leading-[1.2] text-[#1F2123] placeholder-[#B0B0B0]"
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
