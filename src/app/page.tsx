import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Achievements } from "@/components/sections/Achievements";
import { Certifications } from "@/components/sections/Certifications";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Achievements />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
