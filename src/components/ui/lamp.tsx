"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full z-0",
        className
      )}
    >
      {/* Lamp light effect positioned at the top */}
      <div className="absolute top-0 left-0 right-0 flex w-full items-start justify-center z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        
        {/* Lamp glow effects */}
        <div className="absolute top-32 h-48 w-full scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-32 z-10 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute top-20 z-10 h-36 w-[28rem] rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute top-16 z-20 h-36 w-64 rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute top-12 z-30 h-0.5 w-[30rem] bg-cyan-400"
        ></motion.div>

      </div>

      {/* Content area with proper spacing */}
      <div className="relative z-50 flex flex-col items-center justify-center min-h-screen w-full px-5 pt-20">
        {children}
      </div>
    </div>
  );
};

// New Hero-specific Lamp Container with integrated text
export const HeroLampContainer = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full z-0",
        className
      )}
    >
      {/* Lamp light effect - moved further down to prevent cutoff */}
      <div className="relative flex w-full flex-1 scale-y-100 items-center justify-center isolate z-0 pt-16 sm:pt-20 md:pt-32">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-navy-dark h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-navy-dark bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-navy-dark bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-navy-dark h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-navy-dark blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[3rem] sm:-translate-y-[4rem] md:-translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[4rem] sm:-translate-y-[5rem] md:-translate-y-[7rem] bg-cyan-400"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-28 sm:h-32 md:h-44 w-full -translate-y-[6rem] sm:-translate-y-[7rem] md:-translate-y-[12.5rem] bg-navy-dark"></div>
      </div>

      {/* Hero Content positioned within the lamp light cone - adjusted positioning further down */}
      <div className="relative z-50 flex -translate-y-28 sm:-translate-y-28 md:-translate-y-32 lg:-translate-y-40 flex-col items-center px-5 max-w-4xl mx-auto">
        <HeroContent />
      </div>
    </div>
  );
};

// Hero Content Component with spotlight reveal effect
const HeroContent = () => {
  const roles = ["AI/ML Researcher", "Software Engineer", "Computer Science Student", "Tech Enthusiast"];
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = React.useState(true);

  React.useEffect(() => {
    const currentRole = roles[roleIndex];
    
    const timeoutId = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        
        if (displayText === currentRole) {
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

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* All hero text positioned within the lamp light */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.6,
          ease: "easeOut",
        }}
        className="relative text-center"
      >
        {/* "Hi, my name is" text - now positioned within the light */}
        <motion.p
          className="font-mono text-primary text-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.4,
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          Hi, my name is
        </motion.p>

        {/* Main name with lamp light reveal effect */}
        <motion.h1
          initial={{ opacity: 0.3, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 1,
            ease: "easeInOut",
          }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          <motion.span
            className="text-slate-200 sm:bg-gradient-to-br sm:from-slate-300 sm:to-slate-500 sm:bg-clip-text sm:text-transparent"
            initial={{ backgroundPosition: "200% center" }}
            animate={{ backgroundPosition: "0% center" }}
            transition={{
              delay: 0.8,
              duration: 1.2,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: "200% 100%",
            }}
          >
            <span className="inline-block">
              <span className="inline-block relative">
                <motion.span 
                  className="absolute -top-2 -right-2 h-3 w-3 bg-primary rounded-full z-20"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }} 
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                />
              </span>
              Aniket&nbsp;
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
                  repeatDelay: 3,
                  delay: 2
                }}
              >.</motion.span>
            </span>
          </motion.span>
        </motion.h1>
        
        {/* Role text with typewriter effect */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <span className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent">
            I'm a{" "}
          </span>
          <span className="text-primary relative">
            {displayText}
            <span className="absolute right-0 top-0 h-full border-r-4 border-primary animate-pulse"></span>
          </span>
        </motion.h2>
        
        {/* Description with fade-in effect */}
        <motion.p
          className="text-slate-300 max-w-2xl text-lg leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          I'm a passionate Computer Science junior at Ashland University with a strong focus on AI and machine learning, dedicated to building innovative, real-world solutions through projects that span computer vision, NLP, and intelligent systems.
        </motion.p>
        
        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
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
      </motion.div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <span className="text-slate-300 text-sm mb-2">Scroll down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};