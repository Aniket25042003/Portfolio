import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { LampContainer } from "@/components/ui/lamp";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  // Track mouse position for parallax effects and handle scroll
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Typing animation for the role line
  const roles = ["AI/ML Researcher", "Software Engineer", "Computer Science Student", "Tech Enthusiast"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    
    const timeoutId = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        
        if (displayText === currentRole) {
          // Wait at complete word for a moment
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        
        if (displayText === "") {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeoutId);
  }, [displayText, isDeleting, roleIndex, roles]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
    >
      <LampContainer className="bg-navy-dark dark:bg-navy-dark">
        {/* Hero Content */}
        <div className="flex flex-col items-center space-y-6 text-center max-w-4xl mx-auto">
          <motion.p
            className="font-mono text-primary text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hi, my name is
          </motion.p>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0.5, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut"
            }}
          >
            <span className="inline-block">
              <span className="inline-block relative">
                A
                <motion.span 
                  className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }} 
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </span>
              niket&nbsp;
            </span>
            <span className="inline-block">
              <span className="inline-block">P</span>
              <span className="inline-block">a</span>
              <span className="inline-block">t</span>
              <span className="inline-block">e</span>
              <span className="inline-block">l</span>
              <motion.span 
                className="inline-block text-primary"
                animate={{ 
                  rotate: [0, 10, 0, -10, 0]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 3
                }}
              >.</motion.span>
            </span>
          </motion.h1>
          
          <motion.h2
            className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            I'm a <span className="text-primary relative">
              {displayText}
              <span className="absolute right-0 top-0 h-full border-r-4 border-primary animate-pulse"></span>
            </span>
          </motion.h2>
          
          <motion.p
            className="text-slate-300 max-w-2xl text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            I'm a passionate Computer Science junior at Ashland University with a strong focus on AI and machine learning, dedicated to building innovative, real-world solutions through projects that span computer vision, NLP, and intelligent systems.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <motion.a
              href="#projects"
              className="px-8 py-3 rounded border-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-transparent transition-all duration-300 font-mono relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View my work</span>
              <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-0"></span>
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 rounded bg-primary text-white hover:bg-opacity-90 transition-all duration-200 font-mono shadow-lg hover:shadow-primary/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact me
            </motion.a>
          </motion.div>
        </div>
        
        {/* Scroll indicator positioned at the bottom */}
        {showScrollIndicator && (
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <span className="text-slate-300 text-sm mb-2">Scroll down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-6 w-6 text-primary" />
            </motion.div>
          </motion.div>
        )}
      </LampContainer>
    </section>
  );
};

export default Hero;