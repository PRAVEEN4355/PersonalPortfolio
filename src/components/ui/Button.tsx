"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionButtonProps = Merge<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLMotionProps<"button">>;

export interface ButtonProps extends MotionButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-primary text-white hover:bg-blue-700 shadow-lg shadow-primary/25",
      secondary: "bg-secondary text-white hover:bg-purple-700 shadow-lg shadow-secondary/25",
      outline: "border border-primary text-primary hover:bg-primary/10",
      ghost: "hover:bg-white/10 hover:text-white",
    };
    
    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-6 py-2 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
