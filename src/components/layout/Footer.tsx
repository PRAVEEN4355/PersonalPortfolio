"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiArrowUp } from "react-icons/fi";
import { SiLeetcode, SiStackoverflow } from "react-icons/si";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-background pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <a href="#home" className="text-2xl font-bold text-white tracking-tighter mb-4 inline-block">
              Praveen<span className="text-primary">.dev</span>
            </a>
            <p className="text-gray-400 max-w-sm mt-4">
              Sr. Software Development Engineer - Android with 4 years of experience in designing, developing, and testing mobile applications.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    className="text-gray-400 hover:text-primary transition-colors inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Connect</h3>
            <div className="flex gap-4">
              {[
                { icon: FiLinkedin, href: "https://www.linkedin.com/in/praveenperisamy", label: "LinkedIn" },
                { icon: FiGithub, href: "https://github.com", label: "GitHub" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -3 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-300 hover:text-white hover:border-primary/50 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Praveen Periyasamy. All rights reserved.
          </p>
          
          <motion.button
            whileHover={{ y: -3 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-300 hover:text-white"
            aria-label="Back to top"
          >
            <FiArrowUp />
          </motion.button>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-primary/20 blur-[100px] rounded-full opacity-30 pointer-events-none" />
    </footer>
  );
}
