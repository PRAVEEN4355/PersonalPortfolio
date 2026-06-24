"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import emailjs from "@emailjs/browser";
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin } from "react-icons/fi";
import { SiLeetcode, SiStackoverflow } from "react-icons/si";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Replace with your EmailJS credentials
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formData,
        "YOUR_PUBLIC_KEY"
      );
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: FiMail, title: "Email", value: "16ito35@gmail.com", href: "mailto:16ito35@gmail.com" },
    { icon: FiPhone, title: "Phone", value: "+91-8778151660", href: "tel:+918778151660" },
    { icon: FiMapPin, title: "Location", value: "Bengaluru, Karnataka", href: "#" },
  ];

  const socialLinks = [
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/praveenperisamy" },
    { icon: FiGithub, href: "https://github.com" },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Get In Touch" 
          subtitle="Have a project in mind or want to collaborate? Let's talk!" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <p className="text-gray-400 mb-8">
                Fill out the form and I will get back to you within 24 hours. Alternatively, you can reach out to me directly via email or phone.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <a key={i} href={info.href} className="flex items-center group">
                  <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mr-6">
                    <info.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 font-medium">{info.title}</h4>
                    <p className="text-lg text-gray-300 font-medium group-hover:text-primary transition-colors">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10">
              <h4 className="text-lg font-bold text-white mb-6">Social Profiles</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 transition-all hover:-translate-y-1"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="Project Inquiry"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <FiSend />}
                </Button>

                {submitStatus === "success" && (
                  <p className="text-green-400 text-center mt-4">Message sent successfully!</p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-400 text-center mt-4">Failed to send message. Please try again.</p>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
