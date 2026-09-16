import React from "react";

export interface IconWrapperProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  as?: "button" | "div";
}

export function IconWrapper({
  children,
  size = "md",
  className = "",
  as = "button",
  ...props
}: IconWrapperProps) {
  const sizeClasses = {
    sm: "size-[35px]",
    md: "size-[42px]",
    lg: "size-[46px]",
  };

  const baseClasses = `bg-[#F7F9FB] hover:bg-[#EEF1F4] active:bg-[#E6E9EC] transition-colors rounded-full flex items-center justify-center shrink-0 text-[#1F2123] ${sizeClasses[size]} ${className}`;

  if (as === "div") {
    return <div className={baseClasses}>{children}</div>;
  }

  return (
    <button type="button" className={`${baseClasses} cursor-pointer`} {...props}>
      {children}
    </button>
  );
}
