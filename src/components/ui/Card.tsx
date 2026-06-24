"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps, useMotionTemplate, useMotionValue } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  className?: string;
  children: React.ReactNode;
  glass?: boolean;
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, glass = true, hover = true, ...props }, ref) => {
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        whileHover={hover ? { y: -8, scale: 1.01, transition: { duration: 0.2 } } : undefined}
        className={cn(
          "rounded-2xl p-6 overflow-hidden relative group",
          glass ? "glass-card" : "bg-[var(--card)] border border-[var(--card-border)]",
          hover && "hover:border-primary/50 transition-colors",
          className
        )}
        {...props}
      >
        {hover && (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  450px circle at ${mouseX}px ${mouseY}px,
                  rgba(37, 99, 235, 0.25),
                  transparent 80%
                )
              `,
            }}
          />
        )}
        <div className="relative z-10 h-full flex flex-col">
          {children}
        </div>
      </motion.div>
    );
  }
);
Card.displayName = "Card";
