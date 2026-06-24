"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { FiCode, FiSmartphone, FiUsers, FiAward } from "react-icons/fi";

export function About() {
  const stats = [
    { icon: FiAward, value: "4", label: "Years Experience", color: "text-blue-400" },
    { icon: FiCode, value: "10+", label: "Projects Completed", color: "text-cyan-400" },
    { icon: FiSmartphone, value: "6+", label: "Apps Developed", color: "text-purple-400" },
    { icon: FiUsers, value: "3+", label: "Organizations", color: "text-green-400" },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="About Me" 
          subtitle="Get to know me and my professional journey." 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Sr. Software Development Engineer - Android
            </h3>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                I am an Android Developer with 4 years of experience in designing, developing, and testing mobile applications for the Android platform. 
              </p>
              <p>
                I have deep expertise in a wide range of Android development technologies, including Jetpack Architecture, Data Binding, Room Database, and Kotlin modern architectural patterns like MVVM and MVC. I am also highly proficient in integrating third-party libraries and services to deliver robust, enterprise-level solutions.
              </p>
              <p>
                My approach combines rigorous testing practices—including VAPT, API security validation, and Postman API Testing—with a keen eye for seamless user experiences, ensuring that every app I build not only functions flawlessly but is also highly secure.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="flex flex-col items-center justify-center text-center p-8 h-full">
                  <stat.icon className={`w-10 h-10 mb-4 ${stat.color}`} />
                  <h4 className="text-4xl font-bold text-white mb-2">{stat.value}</h4>
                  <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
