import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className = "",
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`w-full px-5 sm:px-8 md:px-[70px] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

