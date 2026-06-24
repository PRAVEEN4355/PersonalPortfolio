"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FiGithub, FiExternalLink } from "react-icons/fi";

import Image from "next/image";

const projects = [
  {
    title: "GLOW App",
    description: "A comprehensive loan portfolio data management application. It tracks the entire loan lifecycle from origination to final disbursal. Features Digital KYC, automated credit verification, and seamless integration with credit bureaus.",
    tech: ["Android", "SQLite", "REST APIs", "Digital KYC"],
    github: "#",
    demo: "#",
    image: "/glow-chart.png",
  },
  {
    title: "Trucell Field Operation",
    description: "An application used by field officers to collect loan amounts and capture digital signatures. Includes 3rd party integration for RBI compliance (Leegality NSDL) and customer validation via OTP and Fingerprint.",
    tech: ["Android", "Java", "Third-party SDKs", "Biometrics"],
    github: "#",
    demo: "#",
    image: "/trucell-mobile.png",
  },
  {
    title: "Liveness Detection Library",
    description: "An Android Library for complex liveness detection tasks including face, eyes blink, smile, face shake, and mouth detection. Validates continuous face presence across multiple tasks and reinitializes on face change.",
    tech: ["Kotlin", "Camera API", "Machine Learning", "Vision API"],
    github: "#",
    demo: "#",
    image: "/liveness-face.png",
  },
  {
    title: "Customer Application",
    description: "A financial mobile app providing account information, branch details, and UPI payment integration. Users can track payment history and upcoming loan payments efficiently.",
    tech: ["Android", "UPI Integration", "REST", "MVVM"],
    github: "#",
    demo: "#",
    image: "/customer-bank.png",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-slate-900/50">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Featured Projects" 
          subtitle="A selection of my recent professional work and libraries." 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col group overflow-hidden">
                <div className="h-56 rounded-t-xl bg-slate-950/50 mb-6 flex items-center justify-center overflow-hidden relative border-b border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80 z-10 pointer-events-none" />
                  
                  {/* Continuous Floating Animation Container */}
                  <motion.div
                    animate={{ 
                      y: [-8, 8, -8],
                      rotate: [-1, 1, -1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 4, 
                      ease: "easeInOut",
                      delay: index * 0.5 // Stagger the floating effect
                    }}
                    className="z-0 relative w-full h-full flex items-center justify-center mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <Image 
                      src={project.image} 
                      alt={`${project.title} 3D Icon`}
                      fill
                      className="object-contain scale-[1.3] group-hover:scale-[1.4] transition-transform duration-700 ease-out p-4"
                      unoptimized
                    />
                  </motion.div>
                </div>
                
                <div className="px-6 pb-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-2 mt-auto">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
