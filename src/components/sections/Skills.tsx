"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const skillCategories = [
  {
    title: "Languages & Data",
    skills: [
      { name: "Java", level: 95 },
      { name: "Kotlin", level: 90 },
      { name: "XML", level: 95 },
      { name: "JSON", level: 95 },
    ],
  },
  {
    title: "Architecture & Core",
    skills: [
      { name: "MVVM / MVC", level: 95 },
      { name: "Clean Architecture", level: 90 },
      { name: "Jetpack Architecture", level: 90 },
      { name: "Data Binding", level: 95 },
    ],
  },
  {
    title: "Libraries & Database",
    skills: [
      { name: "Room / SQLite", level: 95 },
      { name: "Firebase / Analytics", level: 90 },
      { name: "Google API / REST", level: 90 },
      { name: "MySQL", level: 80 },
    ],
  },
  {
    title: "Tools & Testing",
    skills: [
      { name: "Android Studio / Eclipse", level: 95 },
      { name: "Git / SVN / GitHub", level: 90 },
      { name: "Postman API Testing", level: 95 },
      { name: "Unit Testing / VAPT", level: 85 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-slate-900/50">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Technical Skills" 
          subtitle="My toolbox for building high-performance Android applications." 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="w-2 h-6 bg-primary rounded-full mr-3" />
                  {category.title}
                </h3>
                
                <div className="space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-gray-500 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
