"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FiAward, FiStar, FiTrendingUp } from "react-icons/fi";
import { MouseEvent } from "react";

const awards = [
  {
    title: "Rookie Rockstar",
    subtitle: "Emerging Talent",
    date: "March 2026",
    company: "Craft Silicon Pvt. Ltd.",
    description: "Awarded for exceptional performance, quick learning, and emerging as a top talent in the Android development team.",
    icon: FiAward,
    color: "from-amber-400 to-orange-600",
  },
  {
    title: "Star Performer",
    subtitle: "Top Performer of the Quarter",
    date: "October 2025",
    company: "Craft Silicon Pvt. Ltd.",
    description: "Certificate of Achievement for exceeding set targets and setting a benchmark for excellence in the organization.",
    icon: FiStar,
    color: "from-blue-400 to-indigo-600",
  },
  {
    title: "Rookie Rockstar Trophy",
    subtitle: "Emerging Talent Award",
    date: "2025 - 2026",
    company: "Craft Silicon Pvt. Ltd.",
    description: "Physical trophy awarded in recognition of outstanding dedication and exceptional contributions to the company's success.",
    icon: FiTrendingUp,
    color: "from-emerald-400 to-teal-600",
  },
];

// Interactive 3D Card (8D effect)
function AwardCard({ award, index }: { award: any, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="perspective-1000 h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full glass-card rounded-2xl p-8 border border-white/10 group hover:border-primary/50 transition-colors cursor-pointer flex flex-col"
      >
        <div 
          style={{ transform: "translateZ(50px)" }}
          className={`absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br ${award.color} rounded-full opacity-10 blur-2xl group-hover:opacity-30 transition-opacity`}
        />
        
        <div style={{ transform: "translateZ(40px)" }} className="relative z-10 flex flex-col h-full">
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${award.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
            <award.icon size={28} />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-1">{award.title}</h3>
          <h4 className="text-primary font-medium mb-4">{award.subtitle}</h4>
          
          <p className="text-gray-400 mb-8 leading-relaxed flex-grow">
            {award.description}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
            <span className="text-sm font-semibold text-gray-300">{award.company}</span>
            <span className="text-sm text-gray-500 bg-slate-800 px-3 py-1 rounded-full">{award.date}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section id="awards" className="py-24 relative overflow-hidden bg-slate-900/50">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Awards & Recognitions" 
          subtitle="Recent achievements and honors recognizing my professional contributions." 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
          {awards.map((award, index) => (
            <AwardCard key={index} award={award} index={index} />
          ))}
        </div>
      </div>
      
      {/* Required CSS for 3D Perspective */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 {
          perspective: 1000px;
        }
      `}} />
    </section>
  );
}
