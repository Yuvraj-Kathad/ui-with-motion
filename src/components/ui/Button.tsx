import React from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-[#1F2123] text-white hover:bg-black rounded-[40px] font-medium leading-[1.2] shadow-sm",
    secondary:
      "bg-[#EEF1F4] text-[#7D7F82] hover:bg-[#E6E9EC] hover:text-[#1F2123] rounded-[20px] font-semibold leading-normal",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "text-[14px] px-4 py-2",
    md: variant === "primary" ? "text-[16px] px-6 py-3" : "text-[14px] px-8 py-2.5",
    lg: variant === "primary" ? "text-[16px] px-8 py-3.5" : "text-[14px] px-10 py-3",
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
