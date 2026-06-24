"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { FiBriefcase, FiCalendar } from "react-icons/fi";

const experiences = [
  {
    role: "Android Application Developer",
    company: "Craft Silicon Pvt. Ltd. | Bengaluru, Karnataka",
    period: "08/2024 - Present",
    responsibilities: [
      "GLOW App: Captured entire loan portfolio data from origination to disbursal using SQLite and REST APIs.",
      "Tracked the entire loan lifecycle along with Digital KYC.",
      "Enabled automated credit verification, integration with credit bureaus, and synchronized data availability between branch and central office.",
      "Trucell Field Operation: Developed field officer application to collect loan amounts and capture digital signatures.",
      "Implemented 3rd party integration for RBI guidelines (Leegality NSDL) to capture customer validation data including signature, OTP, and fingerprint.",
      "IL_OS Application: Managed individual loan lending process for business and tracked lifecycle with Digital KYC.",
      "Customer Application: Built mobile app for Pahal Financial Services featuring account info, UPI payments, and payment history."
    ],
  },
  {
    role: "Android Application Developer",
    company: "Wipro Technology Ltd. | Bengaluru, Karnataka",
    period: "04/2021 - 12/2023",
    responsibilities: [
      "Payment and Cards: Developed payment and commerce solutions for POS devices, networking devices, and unattended payment devices.",
      "Worked on payment processing software, POS integration, card issuance, and payment security solutions.",
      "Media and Entertainment: Developed and optimized interactive entertainment applications for music and movies.",
      "Built features focused on seamless content streaming with exceptional picture quality at minimum bandwidth.",
      "Enhanced performance and stability, enabling broadcasters to deliver an outstanding viewing experience with minimal resource utilization."
    ],
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionHeading 
          title="Professional Experience" 
          subtitle="My career journey and professional background." 
        />

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative pl-8 md:pl-24"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-4px] md:left-[28px] top-6 w-3 h-3 bg-white rounded-full border-2 border-primary shadow-[0_0_10px_#2563EB]" />

                <Card className="hover:-translate-y-2 transition-transform duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <FiBriefcase className="text-primary" />
                        {exp.role}
                      </h3>
                      <div className="text-xl text-primary font-medium">{exp.company}</div>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-full text-gray-300 font-medium text-sm whitespace-nowrap h-fit">
                      <FiCalendar />
                      {exp.period}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-3 mt-1.5 flex-shrink-0">▹</span>
                        <span className="text-gray-300 leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
