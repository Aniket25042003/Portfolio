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
              Hello! I'm John, a software developer based in San Francisco, CA. I enjoy creating
              things that live on the internet, whether that be websites, applications, or anything
              in between. My goal is to always build products that provide pixel-perfect, performant
              experiences.
            </p>
            <p className="text-slate dark:text-slate-light">
              Shortly after graduating from{" "}
              <span className="text-green">Stanford University</span>, I joined the engineering team
              at Acme Inc. where I work on a wide variety of interesting and meaningful projects on a
              daily basis.
            </p>
            <p className="text-slate dark:text-slate-light">
              Here are a few technologies I've been working with recently:
            </p>

            <ul className="grid grid-cols-2 gap-2 text-slate dark:text-slate-light">
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> JavaScript (ES6+)
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> React
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> Node.js
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> TypeScript
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> Python
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> AWS
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
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500"
                alt="John Doe Profile Picture"
                className="rounded hover:filter hover:grayscale transition-all duration-300 h-80 w-80 object-cover"
              />
              <div className="absolute inset-0 bg-green/20 dark:bg-green/10 rounded"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
