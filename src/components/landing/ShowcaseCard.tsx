import React from "react";

export interface ShowcaseCardProps {
  children: React.ReactNode;
  className?: string;
  height?: string;
  width?: string;
}

export function ShowcaseCard({
  children,
  className = "",
}: ShowcaseCardProps) {
  return (
    <div
      className={`bg-[#FBFCFD] border border-[#B7BABD] rounded-[32px] md:rounded-[48px] flex items-center justify-center p-6 overflow-hidden transition-all duration-300 hover:border-[#1F2123]/80 hover:shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
