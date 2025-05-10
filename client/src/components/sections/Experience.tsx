import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { experienceData } from "@/data/experienceData";
import { Briefcase, Calendar, AwardIcon } from "lucide-react";

const Experience = () => {
  const leftExperiences = experienceData.filter((_, index) => index % 2 === 0);
  const rightExperiences = experienceData.filter((_, index) => index % 2 === 1);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="experience" className="py-20 bg-white/50 dark:bg-navy-light/30 transition-all duration-300">
      <div className="container mx-auto px-6">
        <SectionTitle number="03." title="Experience" />

        <div className="relative mx-auto max-w-5xl">
          {/* Center line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/30 transform -translate-x-1/2 z-0 hidden md:block"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              delay: 0.3
            }}
          ></motion.div>

          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              {/* Left column */}
              <div className="space-y-24">
                {leftExperiences.map((experience, index) => (
                  <motion.div
                    key={`left-${index}`}
                    className="relative pr-8 md:pr-0"
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                  >
                    <motion.div
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 h-px w-8 bg-primary/30 hidden md:block"
                      initial={{ width: 0 }}
                      whileInView={{ width: 32 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    />
                    <div className="bg-white dark:bg-navy shadow-md rounded-lg p-6 border-t-4 border-primary transform transition-transform hover:-translate-y-1 hover:shadow-lg duration-300">
                      <div className="flex items-center mb-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary mr-4">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold text-navy dark:text-white">{experience.title}</h3>
                      </div>

                      <h4 className="text-lg text-slate dark:text-slate-light mb-2 font-bold">
                        {experience.company}
                      </h4>

                      <div className="flex items-center mb-4 text-sm text-slate dark:text-slate-light/70">
                        <Calendar className="h-4 w-4 mr-2 text-primary/70" />
                        <span>{experience.period}</span>
                      </div>

                      <ul className="space-y-2 mb-4 list-disc list-inside text-slate dark:text-slate-light">
                        {experience.responsibilities.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {experience.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right column */}
              <div className="space-y-24 md:mt-36">
                {rightExperiences.map((experience, index) => (
                  <motion.div
                    key={`right-${index}`}
                    className="relative pl-8 md:pl-0"
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                  >
                    <motion.div
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 h-px w-8 bg-primary/30 hidden md:block"
                      initial={{ width: 0 }}
                      whileInView={{ width: 32 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    />
                    <div className="bg-white dark:bg-navy shadow-md rounded-lg p-6 border-t-4 border-primary transform transition-transform hover:-translate-y-1 hover:shadow-lg duration-300">
                      <div className="flex items-center mb-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary mr-4">
                          <AwardIcon className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold text-navy dark:text-white">{experience.title}</h3>
                      </div>

                      <h4 className="text-lg text-slate dark:text-slate-light mb-2 font-bold">
                        {experience.company}
                      </h4>

                      <div className="flex items-center mb-4 text-sm text-slate dark:text-slate-light/70">
                        <Calendar className="h-4 w-4 mr-2 text-primary/70" />
                        <span>{experience.period}</span>
                      </div>

                      <ul className="space-y-2 mb-4 list-disc list-inside text-slate dark:text-slate-light">
                        {experience.responsibilities.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {experience.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
