import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

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
  const roles = ["AI/ML Researcher", "Software Engineer", "Computer Science Student", "Tech Innovator"];
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

  // Floating animation for background elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-20 transition-all duration-300 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-80 h-80 rounded-full bg-primary/30 blur-3xl opacity-20 dark:opacity-30"
          animate={{
            x: mousePosition.x / 30,
            y: mousePosition.y / 30
          }}
          transition={{
            type: "spring",
            damping: 50,
            stiffness: 50
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-violet-400/30 blur-3xl opacity-20 dark:opacity-30"
          animate={{
            x: -mousePosition.x / 40,
            y: -mousePosition.y / 40
          }}
          transition={{
            type: "spring",
            damping: 50,
            stiffness: 50
          }}
        />
        
        {/* Decorative shapes */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-16 h-16 border-4 border-primary/30 opacity-50"
          animate={floatingAnimation}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full border-4 border-primary/30 opacity-50"
          animate={{
            ...floatingAnimation,
            y: [0, 10, 0]
          }}
        />
        <motion.div 
          className="absolute top-1/3 left-1/4 w-12 h-12 rotate-45 bg-primary/10 opacity-50"
          animate={{
            ...floatingAnimation,
            rotate: [45, 90, 45]
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 relative">
        <div className="flex flex-col items-start space-y-4">
          <motion.p
            className="font-mono text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hi, my name is
          </motion.p>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-navy dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
            className="text-4xl md:text-6xl font-bold text-slate dark:text-slate-light mt-2 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I'm a <span className="text-primary relative">
              {displayText}
              <span className="absolute right-0 top-0 h-full border-r-4 border-primary animate-pulse"></span>
            </span>
          </motion.h2>
          
          <motion.p
            className="text-slate max-w-xl text-lg mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            I'm a software developer specializing in building exceptional digital experiences.
            Currently, I'm focused on building accessible, human-centered products at{" "}
            <a href="#" className="text-primary hover:underline relative group">
              Acme Inc
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            .
          </motion.p>
          
          <motion.div
            className="flex gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.a
              href="#projects"
              className="px-6 py-3 rounded border-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-transparent transition-all duration-300 font-mono relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View my work</span>
              <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-0"></span>
            </motion.a>
            <motion.a
              href="#contact"
              className="px-6 py-3 rounded bg-primary text-white hover:bg-opacity-90 transition-all duration-200 font-mono shadow-lg hover:shadow-primary/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact me
            </motion.a>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        {showScrollIndicator && (
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <span className="text-slate dark:text-slate-light text-sm mb-2">Scroll down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-6 w-6 text-primary" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
