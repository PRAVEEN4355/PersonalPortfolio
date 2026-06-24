"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { FiAward } from "react-icons/fi";

const certifications = [
  { title: "Android Development", provider: "Google" },
  { title: "Kotlin Programming", provider: "JetBrains" },
  { title: "Jetpack Compose", provider: "Udacity" },
  { title: "Firebase Integration", provider: "Google Cloud" },
];

export function Certifications() {
  return (
    <section id="certifications" className="py-24 relative bg-slate-900/50">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Certifications" 
          subtitle="Professional credentials and ongoing learning." 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex flex-col items-center text-center p-8 group h-full hover:border-primary/50 transition-colors">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <FiAward size={32} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
                <p className="text-primary/80 font-medium">{cert.provider}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
