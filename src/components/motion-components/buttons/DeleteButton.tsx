"use client";

import React, { useState } from "react";
import Image from "next/image";

export function DeleteButton() {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
      className={`relative w-[123px] h-[30px] bg-white border border-[#1F2123] rounded-[7px] flex items-center justify-between overflow-hidden cursor-pointer select-none transition-all duration-150 ${
        active
          ? "translate-x-[4px] translate-y-[3px] shadow-[2px_2px_0px_0px_black]"
          : "shadow-[6px_5px_0px_0px_black] hover:shadow-[4px_3px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px]"
      }`}
    >
      <span className="font-work font-medium text-[16px] text-black leading-[1.2] pl-[23px]">
        Delete
      </span>
      <div className="bg-[#E6E9EC] w-[36px] h-full flex items-center justify-center border-l border-[#1F2123]/30 shrink-0">
        <div className="relative size-[18px]">
          <Image
            src="/icons/delete.svg"
            alt="Delete"
            width={18}
            height={18}
            className="size-full object-contain"
          />
        </div>
      </div>
    </button>
  );
}

export function DeleteButtonGroup() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <DeleteButton />
      <DeleteButton />
    </div>
  );
}
