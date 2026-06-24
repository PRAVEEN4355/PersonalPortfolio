"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { FiSmartphone, FiLayout, FiDatabase, FiZap, FiTool, FiUploadCloud } from "react-icons/fi";

const services = [
  { icon: FiSmartphone, title: "Android App Development", description: "Building scalable, native Android applications from scratch." },
  { icon: FiLayout, title: "UI Development", description: "Creating pixel-perfect, responsive UI with Jetpack Compose." },
  { icon: FiDatabase, title: "API Integration", description: "Seamless integration of complex REST APIs and backend services." },
  { icon: FiZap, title: "Performance Optimization", description: "Enhancing app speed, reducing memory footprint, and improving UX." },
  { icon: FiTool, title: "Bug Fixing & Maintenance", description: "Identifying, troubleshooting, and resolving critical application bugs." },
  { icon: FiUploadCloud, title: "Play Store Publishing", description: "End-to-end support for deploying apps to the Google Play Store." },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Services" 
          subtitle="What I can do for you and your business." 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col items-start p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
