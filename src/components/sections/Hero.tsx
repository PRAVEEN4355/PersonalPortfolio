"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FiDownload, FiMail, FiArrowRight } from "react-icons/fi";
import Lottie from "lottie-react";

const titles = [
  "Sr. Android Engineer",
  "Kotlin Expert",
  "Jetpack Architecture",
  "Problem Solver",
];

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    // Fetch the animation data securely on the client side
    fetch('/developer-typing.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Failed to load Lottie animation", err));
  }, []);

  useEffect(() => {
    const title = titles[titleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && currentText === title) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      timer = setTimeout(
        () => {
          setCurrentText((prev) =>
            isDeleting ? prev.slice(0, -1) : title.slice(0, prev.length + 1)
          );
        },
        isDeleting ? 50 : 100
      );
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-accent/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-20"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full glass-card border-primary/30 text-primary text-sm font-semibold tracking-wide">
            👋 Welcome to my portfolio
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Hi, I'm <br />
            <span className="text-gradient">Praveen Periyasamy</span>
          </h1>
          
          <div className="h-12 md:h-16 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-300 flex items-center">
              I am a <span className="text-primary ml-3">{currentText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-1 h-8 md:h-10 bg-primary ml-1 block"
              />
            </h2>
          </div>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed">
            Expertise in a wide range of Android development technologies, including Jetpack Architecture, Data Binding, Room Database, and Kotlin modern architectural patterns (MVVM/MVC).
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg" className="gap-2 group">
              <FiDownload className="group-hover:-translate-y-1 transition-transform" />
              Download Resume
            </Button>
            <a href="#contact">
              <Button variant="secondary" size="lg" className="gap-2">
                <FiMail />
                Contact Me
              </Button>
            </a>
            <a href="#projects">
              <Button variant="ghost" size="lg" className="gap-2 group">
                View Projects
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Lottie Developer Typing Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center h-[400px] lg:h-[600px] w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
          
          <div className="relative w-full h-full max-w-[600px] flex items-center justify-center z-10">
            {animationData ? (
              <Lottie 
                animationData={animationData} 
                loop={true} 
                className="w-full h-full filter drop-shadow-[0_0_30px_rgba(61,220,132,0.3)]" 
              />
            ) : (
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            )}
          </div>

          {/* Experience Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-10 left-0 z-30 glass-card px-6 py-4 rounded-2xl border-white/10 shadow-xl pointer-events-none"
          >
            <div className="text-3xl font-bold text-primary">4+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Years<br/>Experience</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
