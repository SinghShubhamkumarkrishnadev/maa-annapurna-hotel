"use client";

import React, { ReactNode, ElementType } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: "up" | "fade" | "scale";
  delayMs?: number;
  threshold?: number;
  className?: string;
  as?: ElementType;
  id?: string;
}

export default function ScrollReveal({
  children,
  variant = "up",
  delayMs = 0,
  threshold = 0.1,
  className = "",
  as: Component = "div",
  id,
  ...rest
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({
    threshold,
    delayMs,
    once: true,
  });

  const getVariantClasses = () => {
    switch (variant) {
      case "fade":
        return isVisible ? "reveal-fade-in" : "reveal-fade-init";
      case "scale":
        return isVisible ? "reveal-scale-in" : "reveal-scale-init";
      case "up":
      default:
        return isVisible ? "reveal-in" : "reveal-init";
    }
  };

  return (
    <Component
      ref={ref}
      id={id}
      className={`${getVariantClasses()} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
}
