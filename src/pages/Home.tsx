import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Publications from "@/components/sections/Publications";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  useEffect(() => {
    document.title = "Aniket Patel | AI/ML Researcher | Software Engineer";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Publications />
        <Certificates />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
