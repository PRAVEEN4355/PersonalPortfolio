"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // easeOutQuart
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOut * (to - from) + from));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [from, to, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

export function Achievements() {
  const achievements = [
    { value: 50, suffix: "+", label: "Projects" },
    { value: 100, suffix: "K+", label: "Users" },
    { value: 99, suffix: "%", label: "Client Satisfaction" },
    { value: 4, suffix: "+", label: "Years Experience" },
  ];

  return (
    <section id="achievements" className="py-20 relative bg-primary/5 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 flex items-center justify-center">
                <Counter from={0} to={achievement.value} />
                <span className="text-primary">{achievement.suffix}</span>
              </div>
              <div className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider">
                {achievement.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
