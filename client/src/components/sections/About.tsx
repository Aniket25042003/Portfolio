import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const About = () => {
  const { isVisible: isTextVisible, elementRef: textRef } = useScrollReveal();
  const { isVisible: isImageVisible, elementRef: imageRef } = useScrollReveal({ delay: 200 });

  return (
    <section id="about" className="py-20 transition-all duration-300">
      <div className="container mx-auto px-6">
        <SectionTitle number="01." title="About Me" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={textRef}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isTextVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-slate dark:text-slate-light">
              Hi, I'm Aniket Patel, a senior majoring in Computer Science at Ashland University with Mathematics and Management Information Systems minors, where I currently serve as an AI/ML Researcher. I'm passionate about creating smart, scalable systems that blend software engineering, machine learning, and artifician intelligence to solve meaningful, real-world problems.
            </p>
            <p className="text-slate dark:text-slate-light">
              My academic and research interests lie at the intersection of applied AI, real-time systems, and hardware acceleration.
            </p>
            <p className="text-slate dark:text-slate-light">
              Here are a few technologies I've been working with recently:
            </p>

            <ul className="grid grid-cols-2 gap-2 text-slate dark:text-slate-light">
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> Python
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> React
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> JavaScript
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> Machine Learning
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> Deep Learning
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> Hardware Accelerators
              </li>
            </ul>
          </motion.div>

          <motion.div
            ref={imageRef}
            className="relative group mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isImageVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 border-2 border-green rounded translate-x-5 translate-y-5 transition-transform group-hover:translate-x-4 group-hover:translate-y-4 duration-300"></div>
            <div className="relative rounded overflow-hidden">
              <img
                src="/assets/aniket-patel.jpg"
                alt="Aniket Patel Profile Picture"
                className="rounded hover:filter hover:grayscale transition-all duration-300 h-80 w-80 object-cover"
              />
              <div className="absolute inset-0 bg-white/10 dark:bg-green/10 rounded"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
