import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-20 transition-all duration-300 relative overflow-hidden"
    >
      {/* Background patterns - visible in dark mode */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-green blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative">
        <div className="flex flex-col items-start space-y-4">
          <motion.p
            className="font-mono text-green"
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
            John Doe.
          </motion.h1>
          
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-slate dark:text-slate-light mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I build things for the web.
          </motion.h2>
          
          <motion.p
            className="text-slate max-w-xl text-lg mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            I'm a software developer specializing in building exceptional digital experiences.
            Currently, I'm focused on building accessible, human-centered products at{" "}
            <a href="#" className="text-green hover:underline">
              Acme Inc
            </a>
            .
          </motion.p>
          
          <motion.div
            className="flex gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded border-2 border-green text-green hover:bg-green hover:bg-opacity-10 transition-all duration-200 font-mono"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded bg-green text-navy hover:bg-opacity-90 transition-all duration-200 font-mono"
            >
              Contact me
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
